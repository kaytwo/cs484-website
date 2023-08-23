import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      lastUpdated: false,
      logo: {
        src: "/public/uic.svg",
      },
      title: "CS 484: Secure Web Application Development",
      social: {
        github: "https://github.com/kaytwo/cs484-website",
      },
      sidebar: [
        {
          label: "Basics",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Welcome", link: "/" },
            { label: "Schedule", link: "/schedule" },
            { label: "Syllabus", link: "/syllabus" },
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
          label: "Homeworks",
          autogenerate: { directory: "homeworks" },
        },
      ],
      customCss: ["/src/overrides.css"],
    }),
  ],
});
