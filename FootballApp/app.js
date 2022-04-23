import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { create } from 'express-handlebars';

const hbs = create({
  defaultLayout: 'layout.hbs',
  extname: '.hbs',
  helpers: {
  },
});


var app = express();

// Register `hbs.engine` with the Express app.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


const __dirname = dirname(fileURLToPath(import.meta.url));
//route
import teamRouter from './routes/team.js';
import playerRouter from './routes/player.js'
import connectDB from './database/connectDB.js';



connectDB(app);

app.get('/', function (req, res) {
  res.render("Login")
})

app.use('/team', teamRouter)
app.use('/player',playerRouter)
app.use(express.static(__dirname + '/publics'));

const port = 5555;
app.listen(port, async function(){
    console.log(`App listening at http://localhost:${port}`)
})