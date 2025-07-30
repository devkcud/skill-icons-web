<h1 align="center">🖼️ Skill Icons Image Builder 🖌️</h1>

<p align="center">
  <a href="https://github.com/devkcud/skill-icons-web/issues">
    <img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/devkcud/skill-icons-web">
  </a>
  <a href="https://skillicons.devkcud.com">
    <img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fskillicons.devkcud.com">
  </a>
</p>

## About

> [!IMPORTANT]  
> This project is an independent effort and is not affiliated with the official [Skill Icons](https://github.com/tandpfun/skill-icons) project or its creator, [Thijs](https://github.com/tandpfun). The original logo at `/static/favicon.png` and `/static/skillicons.svg` are both owned by [Thijs](https://github.com/tandpfun).

Unofficial "Image Builder" for [Skill Icons](https://github.com/tandpfun/skill-icons), designed with the original project's layout in mind.  
This tool provides a user-friendly interface to enhance your experience in working with Skill Icons, giving you the flexibility to customize and organize your icons.

## 🔥 Features

- [x] Manage Icons (Add, Remove & Rearrange)
- [x] Search Functionality
- [x] Copy to Clipboard
  - [x] Copy URL
  - [x] Copy Markdown
  - [x] Copy HTML
- [x] Configuration
  - [x] Switch Icons to Dark or Light Mode
  - [x] Configure Icons Per Line
- [x] Mobile Compatibility (not so good but it works)
- [x] Import Configuration and Icons from URL

## 📂 Running Locally

1. Clone the repo

```bash
git clone https://github.com/devkcud/skill-icons-web
cd skill-icons-web
```

2. Init submodules

```bash
git submodule update --init --recursive
```

3. Install dependencies using Bun (or similar)

```bash
bun install
```

4. Run the server

```bash
bun run dev
```

5. Open `http://localhost:5173` in your browser

## 📝 Contributing

Feel free to fork the repository, make modifications, and submit PRs. Make sure that any changes adhere to our standards for safety and maintainability.

For those who may not be familiar with Svelte or lack development experience but still wish to contribute, you can contribute by identifying and reporting issues, correcting typos, and other similar tasks.

## 📜 License

This project is released under the [Unlicense](https://unlicense.org/) - see the [LICENSE](LICENSE) file for details.

The icons used in this project are sourced from the [Skill Icons](https://github.com/tandpfun/skill-icons) repository, which has its own licensing terms. Please refer to the repository's license for more information.
