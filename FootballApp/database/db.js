import knexObj from 'knex';

export const connectionInfo = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'sys'
};

const knex = knexObj({
    client: 'mysql',
    version: '5.7',
    connection: connectionInfo,
    pool: {min: 0, max: 10}
});

export default knex;