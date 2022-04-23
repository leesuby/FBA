import session from 'express-session';
import fnMySQLStore from 'express-mysql-session';
import { connectionInfo } from './db.js';

export default function connectDB(app) {

    const MySQLStore = fnMySQLStore(session);
    const sessionStore = new MySQLStore(connectionInfo);

    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            // secure: true
        }
    }));
}