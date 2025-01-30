"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSqlConnection = void 0;
const typeorm_1 = require("typeorm");
const defaultPgConfig = {
    type: 'postgres',
    synchronize: false,
    ssl: true,
    logging: true,
};
const createSqlConnection = ({ username, password, host, database, port, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numericPort = typeof port === 'string' ? parseInt(port, 10) : port;
        if (isNaN(numericPort) || numericPort <= 0 || numericPort > 65535) {
            throw new Error('Invalid port number.');
        }
        if (!username || !password || !host || !database) {
            throw new Error('Missing required database connection parameters.');
        }
        ;
        const AppDataSource = new typeorm_1.DataSource(Object.assign(Object.assign({}, defaultPgConfig), { username,
            password,
            host,
            database, port: numericPort }));
        yield AppDataSource.initialize();
        console.log('Data Source has been initialized!');
        return AppDataSource;
    }
    catch (error) {
        console.error("Error during Data Source initialization", error);
        throw error;
    }
});
exports.createSqlConnection = createSqlConnection;
