"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMongoConnection = exports.createSqlConnection = void 0;
const sql_1 = require("./sql");
Object.defineProperty(exports, "createSqlConnection", { enumerable: true, get: function () { return sql_1.createSqlConnection; } });
const noSql_1 = require("./noSql");
Object.defineProperty(exports, "createMongoConnection", { enumerable: true, get: function () { return noSql_1.createMongoConnection; } });
