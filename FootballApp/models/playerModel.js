import db from "../database/db.js";

export default{
    findAll(limit,offset) {
        
        return db('cau_thu').limit(limit).offset(offset);
    },
    findByID(id) {
         
        return db('cau_thu').where('MaCauThu', id);
    },
    async countAll() {
        const list = await db('cau_thu').count({quantity: 'MaCauThu'});

        return list[0].quantity;
    },
    findByName(name) {
        
        return  db('cau_thu').where('TenCauThu', name);
    },
    async countByName(name) {
        const list = await db('cau_thu').where('TenCauThu', name).count({quantity: ['MaCauThu','DoiBong']});

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