import { Router } from 'express';
import playerModel from '../models/playerModel.js';
const playerRouter = Router()

playerRouter.get('/', async function (req, res) {
  const page = req.query.page || 1;
  const limit = 7;
  const total = await playerModel.countAll();
  let nPages = Math.floor(total / limit);
  if (total % limit > 0) nPages++;
  const pageNumbers = [];
  const offset = (page - 1) * limit;
  for (let i = 1; i <= nPages; i++) {
      pageNumbers.push({
          value: i,
          isCurrent: +page === i
      });
  }

  const list = await playerModel.findAll(limit, offset);

  console.log(list);
  res.render('viewPlayer', {
      players: list,
      empty: list.length === 0,
      pageNumbers,
      firstPage: +page === 1,
      lastPage: +page === nPages,
      previousPage: +page - 1,
      nextPage: +page + 1,
  })
})

playerRouter.post('/search', async function (req, res) {
    
    res.render('viewPlayer', {
      
    })
  })
export default playerRouter;