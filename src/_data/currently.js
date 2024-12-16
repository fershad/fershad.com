import _projects from './projects.js';

export const blurb = "Right now I'm coaching Touch at a local high school, and working on a few active projects with the Green Web Foundation."

const bits = {
    "home": {
        "status": "🇹🇼 In Taiwan.",
    },
    "workTravel": {
        "status": "👨‍💻 Traveling for work.",
    },
    "sportTravel": {
        "status": "🏉 Traveling for sports.",
    },
    "vacation": {
        "status": "🏖️ On vacation."
    },
}

export const key = "home";

export const current = bits[key];

export const status = current.status;

const projectsList = [
    "grid-aware-websites",
    "co2.js",
    "are-my-third-parties-green"
]

export const projects = projectsList.map(slug => {
    return _projects.find(project => project.slug === slug);
});