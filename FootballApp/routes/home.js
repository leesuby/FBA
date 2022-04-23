import { Router } from 'express';
const homeRouter = Router()

homeRouter.get('/search', function (req, res) {
    const keyword = req.query.keyword;
    const type = req.query.category;


    if(type=="Player"){  // Người dùng search cầu thủ
        res.render("viewTeam");
    }
       if(type=="Team"){   // Người dùng search đội bóng

        res.render("viewTeam");
    }

  })

export default homeRouter;