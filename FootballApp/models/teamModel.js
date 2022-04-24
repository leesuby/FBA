// get data from database

import db from "../database/db.js";

export default{
    async findAll(limit,offset) {
        return await db.select('*').from('doi_bong').join('san_bong', {'doi_bong.SanNha': 'san_bong.MaSan'}).limit(limit).offset(offset);
    },
    findByID(id) {
        return db.select('*').from('doi_bong').join('san_bong', {'doi_bong.SanNha': 'san_bong.MaSan'}).where('MaDoi', id);
    },
    async countAll() {
        const list = await db('doi_bong').count({quantity: 'MaDoi'});
        return list[0].quantity;
    },
    findByNameorID(key) {
        
        return  db.select('*').from('doi_bong').join('san_bong', {'doi_bong.SanNha': 'san_bong.MaSan'}).where('TenDoi', key)
        .orWhere('MaDoi',key);
    },
    async countByNameorID(key) {
        const list = await db('doi_bong').where('TenDoi', key).orWhere('MaDoi',key).count({quantity: 'MaDoi'});

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