import db from "../database/db.js";

export default{
    findAll(limit,offset) {
        
        return db('tran_dau').limit(limit).offset(offset);
    },
    findByRoundID(roundId) {
         
        return db('tran_dau').where('VongDau', roundId);
    },
    async countAll() {
        const list = await db('tran_dau').count({quantity: ['MaTran','VongDau']});

        return list[0].quantity;
    },
    
    async countByRoundId(roundId) {
        const list = await db('tran_dau').where('VongDau', roundId).count({quantity: ['MaTran','VongDau']});

        return list[0].quantity;
    },
    
    add(entity) {
        return db('tran_dau').insert(entity);
    },
    delByID(id){
       return db('tran_dau')
        .where('MaTran', id)
        .del()
    },
    
    edit(id,entity) {
        return db('tran_dau')
            .where( 'MaTran', id )
            .update(entity);
    }
   

}