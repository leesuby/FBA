import knexObj from 'knex';

export const connectionInfo = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: process.env.pass,
    database: 'sys'
};

const knex = knexObj({
    client: 'mysql',
    connection: connectionInfo,
    pool: {min: 0, max: 10}
});

export default knex;