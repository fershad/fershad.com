const colors = [
  "grey",
  "stone",
  "red",
  "pink",
  "purple",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
  "choco",
  "brown",
  "sand",
  "camo",
  "jungle",
];
const links = document.querySelectorAll(
  "header nav a, footer nav a, main a:not([class]), main a.button",
);

links.forEach((l) => {
  const random = Math.floor(Math.random() * colors.length);
  l.setAttribute(
    "style",
    `color: light-dark(var(--${colors[random]}-10), var(--${colors[random]}-2))`,
  );
});
