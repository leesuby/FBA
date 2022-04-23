// get data from database

import db from "../database/db.js";

export default{
    findAll(limit,offset) {
        
        return db.select('*').from('doi_bong').join('san_bong', {'doi_bong.SanNha': 'san_bong.MaSan'}).limit(limit).offset(offset);
    },
    findByID(id) {
         
        return db.select('*').from('doi_bong').join('san_bong', {'doi_bong.SanNha': 'san_bong.MaSan'}).where('MaDoi', id);
    },
    async countAll() {
        const list = await db('doi_bong').count({quantity: 'MaDoi'});

        return list[0].quantity;
    },
    findByName(name) {
        
        return  db.select('*').from('doi_bong').join('san_bong', {'doi_bong.SanNha': 'san_bong.MaSan'}).where('TenDoi', name);
    },
    async countByName(name) {
        const list = await db('doi_bong').where('TenDoi', name).count({quantity: 'MaDoi'});

        return list[0].quantity;
    },
    add(entity) {
        return db('doi_bong').insert(entity);
    },
    delByID(id){
       return db('doi_bong')
        .where('MaDoi', id)
        .del()
    },
   
    editName(id,newName) {
        return db('doi_bong')
            .where({ MaDoi: id })
            .update({ TenDoi: newName }, ['MaDoi', 'TenDoi']);
    },

    editPitch(id,newPitch) {
        return db('doi_bong')
            .where({ MaDoi: id })
            .update({ SanNha: newPitch }, ['MaDoi', 'SanNha']);
    },

}