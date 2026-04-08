export const currentYear = new Date().getFullYear();
const startYear = 2019;

export const blogYears = [];

for (let i = startYear; i <= currentYear; i++) {
  blogYears.push(i);
}
