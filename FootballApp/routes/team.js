import { Router } from 'express';
import teamModels from '../models/teamModels.js';
const teamRouter = Router()

teamRouter.get('/',async function (req, res) {
  const page = req.query.page || 1;
  const limit = 7;
  const total =await teamModels.countAll();
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

  const list = await teamModels.findAll(limit, offset);

  console.log(list);
  res.render('viewTeam', {
      teams: list,
      empty: list.length === 0,
      pageNumbers,
      firstPage: +page === 1,
      lastPage: +page === nPages,
      previousPage: +page - 1,
      nextPage: +page + 1,
  })
})

export default teamRouter;