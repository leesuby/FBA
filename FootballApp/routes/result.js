import { Router } from 'express';
const resultRouter = Router()

resultRouter.get('/', function (req, res) {
    
    res.render("reportScreen",{
        reportResult: false
    })
  })

resultRouter.post('/', function (req, res) {
    const date = req.body.datepicker? req.body.datepicker : 0;

    const page=1;
    const pageNumbers = [];

    for (let i = 1; i <= 3; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        });
    }
    res.render("reportScreen",{
        reportResult: true,
        notDateInput: date == 0? true: false,
        pageNumbers,
        firstPage: +page === 1,
        lastPage: +page === 3,
        previousPage: +page - 1,
        nextPage: +page + 1,
    })
  })

export default resultRouter;