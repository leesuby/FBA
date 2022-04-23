import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
//route
import teamRouter from './routes/team.js';
import playerRouter from './routes/player.js'
import connectDB from './database/connectDB.js';
const app = express()
app.set('view engine','ejs')

connectDB(app);

app.get('/', function (req, res) {
  res.render("Login")
})

app.use('/team', teamRouter)
app.use('/player',playerRouter)
app.use(express.static(__dirname + '/publics'));

const port = 3000;
app.listen(port, function(){
    console.log(`App listening at http://localhost:${port}`)
})