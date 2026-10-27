# Muhammad Amas - Portfolio Website

This is a personal portfolio website built with React, Tailwind CSS, and ShadCN UI components.

## Features

- Modern, responsive design with glassy effects
- Dark/light mode support
- Animated sections with Framer Motion
- Contact form
- Project showcase
- Skills display
- Modular component structure

## Technologies Used

- React
- Tailwind CSS
- ShadCN UI
- Framer Motion
- Lucide React icons

## Prerequisites

- Node.js 24.x (as declared in `package.json`)
- npm or yarn

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/MuhammadAmas/My-Portfolio.git
cd My-Portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build will be generated in the `dist` directory.

## Sharing previews

Page titles, descriptions, canonical URLs, and social images are defined in
`src/data/pageMetadata.js`. The production domain is `https://muhammadamas.vercel.app`.
The 1200 × 630 JPEG preview images live in `public/social`; QuickNotes uses demo
notes and Cloudnosys uses the reviewed dashboard screenshot.

`npm run build` generates an HTML entry for each known route, including its
Open Graph and X card tags, so social crawlers do not need to execute React.
`vercel.json` maps direct links to those entries. Keep its explicit page rewrites
in sync when adding a route. The SPA fallback remains available for other paths.
The same metadata updates during client-side navigation.

After building, run `npm run check:sharing` to verify the generated tags,
Vercel destinations, image files, and their dimensions. Deploy the new build
before checking previews on public links; previously shared URLs may retain
a platform's cached preview until it is refreshed.

## Customization

- Update personal information in the components
- Replace images in the `public` directory
- Modify skills and projects data in their respective components
- Update contact information
- Customize colors in the tailwind.config.js file

## License

[MIT](LICENSE)

## Created By

Muhammad Amas
