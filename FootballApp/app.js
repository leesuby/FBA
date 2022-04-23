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
import resultRouter from './routes/result.js';
import connectDB from './database/connectDB.js';
import homeRouter from './routes/home.js';
import scheduleRouter from './routes/schedule.js';


connectDB(app);

app.get('/', function (req, res) {
  res.render("Login",{
    layout : "auth.hbs"
  });
});

//body parse JSON POST REQUEST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',homeRouter)
app.use('/team', teamRouter)
app.use('/player',playerRouter)
app.use('/result',resultRouter)
app.use('/schedule',scheduleRouter)
app.use(express.static(__dirname + '/publics'));

const port = 5555;
app.listen(port, async function(){
    console.log(`App listening at http://localhost:${port}`)
})