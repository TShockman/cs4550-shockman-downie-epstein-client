export const NAME = 'nav';
export const REDIRECT = `${NAME}/REDIRECT`;
export const redirect = path => ({type: REDIRECT, to: path});
