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
      { text: 'Open Me First', link: 'pmops/OpenMeFirst' },
      { text: 'Manual', link: 'pmops/Overview' },
      { text: 'FAQ', link: 'pmops/FAQ' },
      { text: 'Wiki', link: 'http://wiki.powermops.org/' },
      { text: 'SourceForge', link: 'https://sourceforge.net/projects/powermops/' },
    ],
  },
];
