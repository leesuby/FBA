import { Router } from 'express';
import playerModel from '../models/playerModel.js';
import teamModel from '../models/teamModel.js';
const teamRouter = Router()

Number.prototype.padLeft = function (n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
  }



teamRouter.get('/',async function (req, res) {
  const page = req.query.page || 1;
  const limit = 7;
  const total =await teamModel.countAll();
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

  const list = await teamModel.findAll(limit, offset);

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

teamRouter.post('/addteam', async function (req, res) {
    console.log(req.body);
    const url = req.headers.referer || '/';
    const total =await teamModel.countAll()+1;
    req.body.MaDoi="DB"+(total).padLeft(3);
    const ret = await teamModel.add(req.body);
    console.log(req.body);
    res.redirect(url);
})

teamRouter.post('/add_players_of_team', async function (req, res) {
    console.log(req.body);
    const url = req.headers.referer || '/';
    let total =await playerModel.countAll()+1;
    const doibong = req.body.DoiBong;
    console.log(req.body.DoiBong);
    console.log(doibong);
    
    for(let i =0;i<req.body.Players.length;i++){
        const player={
            MaCauThu :"CT"+(total).padLeft(3),
            TenCauThu : req.body.Players[i].TenCauThu,
            LoaiCauThu : req.body.Players[i].LoaiCauThu,
            DoiBong : doibong
    
        };
        total++;
        const ret = await playerModel.add(player);
    }
    
    
    
    console.log(req.body);
    res.redirect(url);
})

export default teamRouter;