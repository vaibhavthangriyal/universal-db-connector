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
exports.createMongoConnection = void 0;
const typeorm_1 = require("typeorm");
const defaultMongoConfig = {
    type: 'mongodb',
    synchronize: false,
    useUnifiedTopology: true,
    logging: false,
};
const createMongoConnection = ({ username, password, host, database, port, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numericPort = typeof port === 'string' ? parseInt(port, 10) : port;
        if (isNaN(numericPort) || numericPort <= 0 || numericPort > 65535) {
            throw new Error('Invalid port number.');
        }
        if (!username || !password || !host || !database) {
            throw new Error('Missing required MongoDB connection parameters.');
        }
        const mongoUri = `mongodb://${username}:${password}@${host}:${numericPort}/${database}`;
        const MongoDataSource = new typeorm_1.DataSource(Object.assign(Object.assign({}, defaultMongoConfig), { url: mongoUri, database }));
        yield MongoDataSource.initialize();
        console.log('MongoDB DataSource has been initialized!');
        return MongoDataSource;
    }
    catch (error) {
        console.error('Error during MongoDB DataSource initialization', error);
        throw error;
    }
});
exports.createMongoConnection = createMongoConnection;
