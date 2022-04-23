import { Router } from 'express';
import scheduleModel from '../models/scheduleModel.js';
const scheduleRouter = Router()

scheduleRouter.get('/', async function (req, res) {
  const page = req.query.page || 1;
  const limit = 7;
  const total = await scheduleModel.countAll();
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

  const list = await scheduleModel.findAll(limit, offset);

  for (let i=0;i<list.length;i++){
      let date = new Date(list[i].NgayThiDau);
      list[i].NgayThiDau = date.toLocaleDateString('en-GB');
      list[i].time= list[i].NgayThiDau +" "+ list[i].GioThiDau ;
  }
  console.log(list);
  res.render('scheduleScreen', {
      match: list,
      empty: list.length === 0,
      pageNumbers,
      firstPage: +page === 1,
      lastPage: +page === nPages,
      previousPage: +page - 1,
      nextPage: +page + 1,
  })
  })

export default scheduleRouter;