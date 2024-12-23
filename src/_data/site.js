const dev = process.env.ELEVENTY_RUN_MODE === "serve" ? true : false;
export const baseURL = dev ? 'http://localhost:8080' : 'https://fershad.com';
export const title = 'Fershad Irani';

export const privacyURL = `${baseURL}/privacy/`;