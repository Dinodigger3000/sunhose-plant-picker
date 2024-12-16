![Sunhose Plant Picker](./public/sunhose-logo.png)

# 🌞🍀 SUNHOSE PLANT PICKER 🍀🌞

[sunhose-plant-picker.web.app](https://sunhose-plant-picker.web.app/)

## Description of the Project

Sunhose plant picker is a React JS Web App hosted on Firebase that enables users to build a profile of their living space and personal preferences, and receive a list of reccomended plants. Our goal with this project was to create a blend of artistic and functional design, and to create a user-friendly interface that allows users to easily navigate and interact with the app.

## FAQ

- **How was plant data collected?**

Plant data and standards for profile building such as light and care levels were collected from The Complete Guide to Indoor Plants.
Specific information about each plant were collected from [The Spruce](https://www.thespruce.com/) and [Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Main_Page).

- **How was plant data stored, and how many plants are there?**
  Plant data is stored in a Firebase database, and there are currently 18 plants in the database. The database was designed with scalability in mind, and can be easily expanded to include more plants.

- **How were the 3D models and designs created and implemented?**
  All featured 3D models were created using Blender, and implemented using React Three Fiber.

## Dependencies

- [React](https://react.dev/)
- [React Three Fiber](https://react-three-fiber.com/)
- [Blender](https://www.blender.org/)
- [Firebase](https://firebase.google.com/)
- [Beautiful Drag and Drop](https://beautiful-dnd.github.io/beautiful-dnd/)

## How to Install and Run the Project on your Device

Wifi is currently required to run the project, and the code references a database hosted on Firebase, a Google cloud hosting service.

In your terminal, run the following commands:

```bash
git clone https://github.com/Dinodigger3000/sunhose-plant-picker.git
cd sunhose-plant-picker
npm install
npm run start
```

## Known Bugs, Glitches, and Missing Features

- SUNHOSE plant picker is currently not suited for mobile devices, as the UI is not optimized for smaller screens.
- SUNHOSE plant picker sometimes encounters visual glitches when the user is using the Mozilla Firefox browser.
- Lower-end devices may experience performance issues when running the app, due to 3D models and animations.

## References

### Documentation Resources

- [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [Beautiful Drag and Drop](https://beautiful-dnd.github.io/beautiful-dnd/)
- [Firebase](https://firebase.google.com/)
- [MDN CSS Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [W3Schools CSS Documentation](https://www.w3schools.com/cssref/index.php)
- [Bootstrap CSS Documentation _(Bootstrap Components were used for our MVP, but are not used in the final product)_](https://getbootstrap.com/docs/3.4/css/)

### Plant Data Resources

- [The Complete Guide to Indoor Plants](https://www.thespruce.com/complete-guide-to-indoor-plants-4128682)
- [Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Main_Page)

### AI Tools

- [Github Copilot](https://github.com/features/copilot)
- [Claude Sonnet 3.5](https://www.anthropic.com/en/blog/introducing-claude-3-5-sonnet)

### Tutorials, Guides, and Other Resources in Use

- [Responsive Typography with CSS Clamp - Tom is Loading on Youtube](https://www.youtube.com/watch?v=erqRw3E-vn4)
- [Drag and Drop in React with React Beautiful DnD - Colby Fayock on Youtube](https://www.youtube.com/watch?v=aYZRRyukuIw)
- [Understanding Grid Layouts — StackOverflow](https://stackoverflow.com/questions/47587892/how-does-css-grid-layout-works)
- [How to Use SVG Components in a React Project — Telerik](https://www.telerik.com/blogs/how-to-use-svg-react)

## Thank you for reading and Happy Plant Picking!
