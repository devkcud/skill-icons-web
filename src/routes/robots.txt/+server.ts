import { site } from '$lib/seo';

export const prerender = true;

export function GET(): Response {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.url}sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
