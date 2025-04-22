# Portfolio Projects Documentation

This document provides information about the projects section of the portfolio website and how to maintain it.

## Overview

The projects section displays your work in a filterable grid with pagination. Each project card showcases:

- Project title and category
- Year completed
- Description
- Technologies used
- Key highlights/features
- Links to demo and source code

## How to Add or Edit Projects

All project data is stored in the file `src/data/projectsInfo.js`. To add or modify projects:

1. Open `src/data/projectsInfo.js`
2. Follow the existing format to add new projects or edit existing ones
3. Make sure to include all required fields for each project

## Project Object Structure

Each project should have the following structure:

```javascript
{
  id: 1,                      // Unique identifier (number)
  title: "Project Name",      // Project title (string)
  description: "...",         // Detailed description (string)
  image: "/path/to/image.jpg", // Path to project image (string)
  technologies: ["Tech1", "Tech2"], // Array of technologies used
  category: "Category",       // Project category (string)
  demoLink: "https://...",    // Link to live demo (string)
  githubLink: "https://...",  // Link to source code (string)
  highlights: [              // Array of key features (strings)
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Feature 4"
  ],
  yearCompleted: 2023        // Year project was completed (number)
}
```

## Project Images

- Project images should be placed in the `/public/projects-images/` directory
- Recommended image dimensions: 16:9 aspect ratio (e.g., 800x450px)
- Optimize images for web to improve loading time
- A placeholder image is available at `/public/projects-images/placeholder.jpg`

## Categories

Categories are automatically generated from the projects. The "All" category is always included.

To add a new category:

1. Simply assign that category to one or more projects
2. The category filter will automatically include it

## Modifying the Layout

If you need to change the project card layout or display:

1. Edit `src/components/Projects.jsx`
2. The main card structure is in the `displayedProjects.map()` function

## Pagination

Pagination is controlled by these settings in Projects.jsx:

```javascript
const [currentPage, setCurrentPage] = useState(0);
const projectsPerPage = 3; // Change this to show more/fewer projects per page
```

## GitHub Link

The "View All Projects on GitHub" button links to your GitHub profile. Update this URL in `src/components/Projects.jsx` if needed.

## Adding Project Details Page

For a future enhancement, consider adding detailed project pages:

1. Create a new component for project details
2. Add routing using a library like React Router
3. Create a page for each project that shows additional information

## Best Practices

1. Keep descriptions concise but informative
2. Use high-quality images that represent the project well
3. Include the most impressive or technically challenging highlights
4. Ensure all links work and open in a new tab
5. Keep the GitHub link updated with your username
