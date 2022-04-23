import { Router } from 'express';
const resultRouter = Router()

resultRouter.get('/', function (req, res) {
    res.render("reportScreen")
  })

export default resultRouter;