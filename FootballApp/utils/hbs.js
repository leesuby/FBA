import { create } from 'express-handlebars';
const hbs = create({
  defaultLayout: 'Login.hbs',
  extname: '.hbs',
  helpers: {
  },
});

export default hbs;