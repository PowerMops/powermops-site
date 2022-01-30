export const sidebar = [
  {
    text: 'Introduction',
    link: '/',
    children: [
      { text: 'About', link: '/about/' },
      { text: 'News', link: '/news/' },
    ],
  },
  {
    subtree: 'amops',
    text: 'aMops', link: '/amops/',
    children: [
      { text: 'Read Me', link: '/amops/readme/' },
      { text: 'Release Notes', link: '/amops/release-notes/' },
      { text: 'SourceForge', link: 'https://sourceforge.net/projects/powermops/' },
    ],
  },
  {
    subtree: 'pmops',
    text: 'Powermops', link: '/pmops/',
    children: [
      { text: 'Open Me First', link: '/pmops/openmefirst' },
      { text: 'Manual', link: '/pmops/overview' },
      { text: 'FAQ', link: '/pmops/faq' },
      { text: 'Tips', link: '/pmops/tips' },
      { text: 'Wiki', link: 'http://wiki.powermops.org/' },
      { text: 'SourceForge', link: 'https://sourceforge.net/projects/powermops/' },
    ],
  },
];
