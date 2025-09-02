import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      components: {
        // Override the default `SocialIcons` component.
        MarkdownContent: "./src/components/EnhancedMarkdownContent.astro",
      },
      lastUpdated: false,
      logo: {
        src: "/public/uic.svg",
      },
      title: "CS 484: Secure Web Application Development",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/kaytwo/cs484-website",
        },
      ],
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
              label: "Changelog",
              link: "/changelog",
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
      customCss: ["/src/styles/global.css", "/src/overrides.css"],
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
