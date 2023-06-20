import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      logo: {
        src: '/public/uic.svg',
      },
      title: 'CS 484: Secure Web Application Development',
      social: {
        github: 'https://github.com/kaytwo/cs484-starlight',
      },
      sidebar: [
        {
          label: 'Basics',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Welcome', link: '/' },
            { label: 'Schedule', link: '/schedule' },
            { label: 'Syllabus', link: '/syllabus' },
          ],
        },
        {
          label: 'Homeworks',
          autogenerate: { directory: 'homeworks' },
        },
      ],
      customCss: ['/src/overrides.css'],
    }),
  ],
});
