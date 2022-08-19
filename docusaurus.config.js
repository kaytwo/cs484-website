// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/uic.svg',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/csatuic/cs484-website/edit/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({navbar: {
      title: "CS 484: Secure Web Application Development",
      logo: {
        alt: "UIC Logo",
        src: "img/uic.svg",
      },
      items: [
        {
          to: "syllabus/",
          label: "Syllabus",
          position: "left",
        },
        {
          to: "schedule/",
          label: "Schedule",
          position: "left",
        },
        {
          href: "https://github.com/csatuic/cs484-website/",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Home", to: "/" },
            { label: "Schedule", to: "/schedule" },
            { label: "Syllabus", to: "/syllabus" },
          ],
        },
        {
          title: "Other tools",
          items: [
            {
              label: "Piazza Q&A",
              href: "https://piazza.com/class/kjs0fa9l97y53k",
            },
            {
              label: "Gradescope",
              href: "https://www.gradescope.com/courses/225629",
            }
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Chris Kanich",
              to: "https://www.cs.uic.edu/~ckanich/",
            },
            {
              label: "GitHub",
              href: "https://github.com/csatuic/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Chris Kanich. Built with Docusaurus.`,
    },      
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
