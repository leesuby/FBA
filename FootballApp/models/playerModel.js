import db from "../database/db.js";

export default{
    async findAll(limit,offset) {
        return await db('cau_thu').join('doi_bong', {'cau_thu.DoiBong': 'doi_bong.MaDoi'}).limit(limit).offset(offset);
    },
    async findByID(id) {
         
        return await db('cau_thu').where('MaCauThu', id);
    },
    async countById(id) {
        const list = await db('cau_thu').count({quantity: 'MaCauThu'}).where('MaCauThu', id);
        return list[0].quantity;
    },
    async countAll() {
        const list = await db('cau_thu').count({quantity: 'MaCauThu'});
        return list[0].quantity;
    },
    async findByNameorID(key,limit,offset) {
        
        return  await db('cau_thu').join('doi_bong', {'cau_thu.DoiBong': 'doi_bong.MaDoi'}).where('TenCauThu', key).orWhere('MaCauThu', key).limit(limit).offset(offset);
    },
    async countByNameorID(key) {
        const list = await db('cau_thu').join('doi_bong', {'cau_thu.DoiBong': 'doi_bong.MaDoi'}).count({quantity: 'MaCauThu'}).where('TenCauThu', key).orWhere('MaCauThu', key);
        return list[0].quantity;
    },
    async findByTeamID(teamId,limit,offset) {
        return db('cau_thu').where('DoiBong', teamId).limit(limit).offset(offset);
    },
    async countByTeamId(teamId) {
        const list = await db('cau_thu').where('DoiBong', teamId).count({quantity: ['MaCauThu','DoiBong']});

        return list[0].quantity;
    },
    add(entity) {
        return db('cau_thu').insert(entity);
    },
    delByID(id){
       return db('cau_thu')
        .where('MaCauThu', id)
        .del()
    },
    delByTeamID(teamId){
        return db('cau_thu')
         .where('DoiBong', teamId)
         .del()
     },
    editName(id,newName) {
        return db('cau_thu')
            .where({ MaCauThu: id })
            .update({ TenCauThu: newName }, ['MaCauThu', 'TenCauThu']);
    },
    editBDate(id,newBdate) {
        return db('cau_thu')
            .where({ MaCauThu: id })
            .update({ NgaySinh: newBdate }, ['MaCauThu', 'NgaySinh']);
    },
    editType(id,newType) {
        return db('cau_thu')
            .where({ MaCauThu: id })
            .update({ LoaiCauThu: newType }, ['MaCauThu', 'LoaiCauThu']);
    },
    editSumGoal(id,newGoal) {
        return db('cau_thu')
            .where({ MaCauThu: id })
            .update({ TongBanThang: newGoal }, ['MaCauThu', 'TongBanThang']);
    },
    addGoal(entity) {
        return db('ban_thang').insert(entity);
    },
    delGoal(id){
        return db('ban_thang')
        .where('MaBan', id)
        .del()
    },
    editGoal(id,entity) {
        return db('ban_thang')
            .where('MaBan', id )
            .update(entity);
    }

}