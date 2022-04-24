import db from "../database/db.js";

export default{
    findAll(limit,offset) {
        
        return db('tran_dau').limit(limit).offset(offset)
        .join('doi_bong as doi1',{'tran_dau.DoiChuNha': 'doi1.MaDoi'})
        .join('doi_bong as doi2',{'tran_dau.DoiKhach':'doi2.MaDoi'})
        .join('vong_dau', {'tran_dau.VongDau': 'vong_dau.MaVong'})
        .select(
            'DoiChuNha',
            'VongDau',
            'DoiKhach',
            'NgayThiDau',
            'GioThiDau',
            'SanDau',
            'doi1.TenDoi as TenDoiChuNha',
            'doi2.TenDoi as TenDoiKhach',
            'TenVong'
        );
    },
    findByRoundID(roundId) {
         
        return db('tran_dau').where('VongDau', roundId);
    },
    async countAll() {
        const list = await db('tran_dau').count({quantity: 'MaTran'});

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