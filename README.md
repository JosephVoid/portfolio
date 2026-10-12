# Portfolio

Personal portfolio site of Yoseph Tenaw. Built with Vite, Tailwind CSS and plain JavaScript.

On desktop the site is a canvas that can be dragged and zoomed. On screens up to 500px wide it is an accordion.

## Commands

```sh
npm install
npm run dev      # dev server
npm run build    # production build in dist/
npm run preview  # serve the production build
npm run lint     # ESLint
npm run format   # Prettier
```

## Editing content

All text, links and image paths live in `src/data.json`. Both layouts render from it.

- **Add a project:** append an entry to `projects`. `image` is the main picture. `logo` is optional; when set, the desktop card alternates between the logo and the image. Leave `site` empty if there is no live site. `year` is shown under the title. `text` may contain HTML.
- **Add a job or a link:** append an entry to `experience` or `links`. A link's `icon` is a [Font Awesome 4](https://fontawesome.com/v4/icons/) class.
- **Add a skill:** each group in `skills` is a list of `{ name, icon }`; put the logo in `public/tech/`.
- **Images** go in `public/` and are referenced from the root, for example `/portfolio/npm.png`.

## Structure

```
index.html        page skeleton for both layouts
src/
  main.js         entry point
  data.json       site content
  content.js      renders navigation, about, skills, experience, links, contact forms
  projects.js     project cards, image slides and the details modal
  canvas.js       desktop canvas: drag to pan, zoom, sidebar navigation
  accordion.js    mobile accordion
  dom.js          small DOM helpers
  index.css       Tailwind entry and custom styles
public/           static images and fonts
```

Elements in `index.html` marked with `data-slot`, `data-skill-icons` or `data-contact-form` are filled in by `src/content.js`.
