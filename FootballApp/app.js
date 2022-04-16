import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
//route
import teamRouter from './routes/team.js';

const app = express()
app.set('view engine','ejs')


app.get('/', function (req, res) {
  res.render("Login")
})


app.use('/team', teamRouter)
app.use(express.static(__dirname + '/publics'));

const port = 3000;
app.listen(port, function(){
    console.log(`App listening at http://localhost:${port}`)
})