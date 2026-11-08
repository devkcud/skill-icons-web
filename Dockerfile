FROM node:24-bookworm-slim AS build

COPY --from=oven/bun:1 /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /app

COPY package.json bun.lockb .npmrc ./
RUN bun install --frozen-lockfile

ARG SKILL_ICONS_REF=7f7e691e71aec64e8354bf697835e009d1ad80f8
RUN node --input-type=module -e "\
    import { writeFile } from 'node:fs/promises'; \
    const ref = process.env.SKILL_ICONS_REF; \
    const res = await fetch('https://codeload.github.com/tandpfun/skill-icons/tar.gz/' + ref, { signal: AbortSignal.timeout(60000) }); \
    if (!res.ok) throw new Error('Icon download failed: ' + res.status); \
    await writeFile('/tmp/skill-icons.tar.gz', Buffer.from(await res.arrayBuffer()));" \
    && mkdir -p static/skill-icons \
    && tar -xzf /tmp/skill-icons.tar.gz --strip-components=1 -C static/skill-icons \
        skill-icons-${SKILL_ICONS_REF}/icons skill-icons-${SKILL_ICONS_REF}/LICENSE

COPY . .
RUN bun x --no-install svelte-kit sync \
    && bun run build \
    && rm -rf node_modules \
    && bun install --frozen-lockfile --production --ignore-scripts

FROM node:24-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000 \
    PROTOCOL_HEADER=x-forwarded-proto \
    HOST_HEADER=x-forwarded-host

COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/build ./build

USER node

EXPOSE 3000

CMD ["node", "build"]
