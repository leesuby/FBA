import db from "../database/db.js";

export default{
    findAll(limit,offset) {
        
        return db('san_bong').limit(limit).offset(offset);
    },
    findByID(id) {
         
        return db('san_bong').where('MaSan', id);
    },
    async countAll() {
        const list = await db('san_bong').count({quantity: 'MaSan'});

        return list[0].quantity;
    },
    findByName(name) {
        
        return  db('san_bong').where('TenSan', name);
    },
    async countByName(name) {
        const list = await db('san_bong').where('TenSan', name).count({quantity: 'MaSan'});

        return list[0].quantity;
    },
    
    add(entity) {
        return db('san_bong').insert(entity);
    },
    delByID(id){
       return db('san_bong')
        .where('MaSan', id)
        .del()
    },
    
    editName(id,newName) {
        return db('san_bong')
            .where({ MaSan : id })
            .update({ TenSan: newName }, ['MaSan', 'TenSan']);
    }
    

}