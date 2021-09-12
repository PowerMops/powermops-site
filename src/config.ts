export const sidebar = [
  {
    text: 'Introduction',
    link: '', // No leading slash needed, so this links to the homepage
    children: [
      { text: 'About', link: 'about' },
      { text: 'News', link: 'news' },
    ],
  },
  {
    text: 'Powermops', link: 'pmops',
    children: [
      { text: 'Open Me First', link: 'pmops/openmefirst' },
      { text: 'Manual', link: 'pmops/overview' },
      { text: 'FAQ', link: 'pmops/faq' },
      { text: 'Wiki', link: 'http://wiki.powermops.org/' },
      { text: 'SourceForge', link: 'https://sourceforge.net/projects/powermops/' },
    ],
  },
];
