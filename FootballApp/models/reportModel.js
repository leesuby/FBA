// get data from database

import db from "../database/db.js";

export default{
    findAllGoal(date,limit,offset) {
        
        return db.select('*').from('ban_thang').join('cau_thu', {'ban_thang.CauThu': 'cau_thu.MaCauThu'})
        .join('tran_dau', {'ban_thang.TranDau': 'tran_dau.MaTran'}).where('NgayThiDau', '=', date).limit(limit).offset(offset);
    },
    
    async countAllGoal(date) {
        const list = await db('ban_thang').join('tran_dau', {'ban_thang.TranDau': 'tran_dau.MaTran'}).where('NgayThiDau', '=', date).count({quantity: 'MaBan'});

        return list[0].quantity;
    }
    
    

}