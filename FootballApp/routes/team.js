import { Router } from 'express';
const teamRouter = Router()

teamRouter.get('/', function (req, res) {
    res.render("viewTeam")
  })

export default teamRouter;