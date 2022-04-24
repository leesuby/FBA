import { Router } from 'express';
import playerModel from '../models/playerModel.js';
import teamModel from '../models/teamModel.js';
const homeRouter = Router()

homeRouter.get('/search', async function (req, res) {
    const keyword = req.query.keyword;
    const type = req.query.category;


    if(type=="Player"){  // Người dùng search cầu thủ
      const page = req.query.page || 1;
      const limit = 7;
      const total = await playerModel.countByNameorID(keyword);
      
      
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
    
      const list = await playerModel.findByNameorID(keyword,limit,offset);

      for(let idx=0;idx<list.length;idx++){
        if(list[idx].LoaiCauThu==0)
        list[idx].LoaiCauThu='Trong nước'
        else  if(list[idx].LoaiCauThu==1)
        list[idx].LoaiCauThu='Ngoài nước'

      }
      
      
    
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
    }
       if(type=="Team"){   // Người dùng search đội bóng

        const page = req.query.page || 1;
      const limit = 7;
      const total = await teamModel.countByNameorID(keyword);
      
      
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
    
      const list = await teamModel.findByNameorID(keyword,limit,offset);

      
      
      
    
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
    }

  })

export default homeRouter;