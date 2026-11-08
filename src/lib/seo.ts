export const site = {
  name: 'Skill Icons Image Builder',
  title: 'Skill Icons Builder for GitHub READMEs',
  description:
    'Build Skill Icons for your GitHub README, portfolio, or resume. Pick and reorder icons, choose a theme, then copy the image URL, Markdown, or HTML.',
  url: 'https://skillicons.devkcud.com/',
  image: 'https://skillicons.devkcud.com/favicon.png'
} as const;

export const schema = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site.url}#website`,
      name: site.name,
      url: site.url,
      description: site.description,
      inLanguage: 'en'
    },
    {
      '@type': 'WebApplication',
      '@id': `${site.url}#app`,
      name: site.name,
      url: site.url,
      description: site.description,
      image: site.image,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript and a modern web browser.',
      isAccessibleForFree: true,
      isPartOf: { '@id': `${site.url}#website` }
    }
  ]
})
  .replace(/</g, '\\u003c')
  .replace(/&/g, '\\u0026');
