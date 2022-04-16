import express from 'express';

//route
import teamRouter from './routes/team.js';

const app = express()
app.set('view engine','ejs')


app.get('/', function (req, res) {
  res.render("mainScreen")
})


app.use('/team', teamRouter)

const port = 3000;
app.listen(port, function(){
    console.log(`App listening at http://localhost:${port}`)
})