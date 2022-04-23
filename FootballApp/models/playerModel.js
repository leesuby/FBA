import db from "../database/db.js";

export default{
    async findAllPlayer(limit, offset) {
        return await db('cau_thu').limit(limit).offset(offset);
    },
    async countAllPlayer(){
        const list = await db('cau_thu').count({quantity: 'MaCauThu'});
        return list[0].quantity;
    }
}