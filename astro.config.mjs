import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    starlight({
      lastUpdated: false,
      logo: {
        src: "/public/uic.svg",
      },
      title: "CS 484: Secure Web Application Development",
      social: {
        github: "https://github.com/kaytwo/cs484-website",
      },
      editLink: {
        baseUrl: "https://github.com/kaytwo/cs484-website/edit/main/",
      },
      tableOfContents: {
        minHeadingLevel: 1,
        maxHeadingLevel: 3,
      },
      sidebar: [
        {
          label: "Basics",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Welcome",
              link: "/",
            },
            {
              label: "Schedule",
              link: "/schedule",
            },
            {
              label: "Syllabus",
              link: "/syllabus",
            },
            {
              label: "Resources",
              link: "/resources",
            },
            {
              label: "Discussion",
              link: "https://piazza.com/uic/fall2024/cs484",
            },
            {
              label: "Gradescope",
              link: "https://www.gradescope.com/courses/833367",
            },
          ],
        },
        {
          label: "Readings",
          autogenerate: {
            directory: "readings",
          },
          collapsed: true,
        },
        {
          label: "Homeworks",
          autogenerate: {
            directory: "homeworks",
          },
        },
      ],
      customCss: ["/src/overrides.css"],
    }),
  ],
  output: "server",
  experimental: {
    serverIslands: true,
  },
  adapter: node({
    mode: "standalone", // Set the mode option
  }),
});
