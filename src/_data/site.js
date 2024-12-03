export const dev = process.env.NODE_ENV !== 'production';
export const baseURL = dev ? 'http://localhost:8080' : 'https://fershad.com';
export const title = 'Fershad Irani';

export const privacyURL = `${baseURL}/privacy/`;