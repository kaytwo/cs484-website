import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({ applyBaseStyles: false }),
    starlight({
      lastUpdated: false,
      logo: {
        src: "/public/uic.svg",
      },
      title: "CS 484: Secure Web Application Development",
      social: {
        github: "https://github.com/kaytwo/cs484-website",
      },
      tableOfContents: { minHeadingLevel: 1, maxHeadingLevel: 3 },
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
              link: "https://piazza.com/uic/fall2023/cs484",
            },
            {
              label: "Gradescope",
              link: "https://www.gradescope.com/courses/537130",
            },
          ],
        },
        {
          label: "Readings",
          autogenerate: {
            directory: "readings",
          },
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
});
