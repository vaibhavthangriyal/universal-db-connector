import { DataSource, DataSourceOptions } from 'typeorm';

const defaultMongoConfig: DataSourceOptions = {
  type              : 'mongodb',
  synchronize       : false,
  useUnifiedTopology: true,
  logging           : false,
};

type MongoConnectionParams = {
  username: string;
  password: string;
  host    : string;
  database: string;
  port    : number | string;
};

export const createMongoConnection = async ({
  username,
  password,
  host,
  database,
  port,
}: MongoConnectionParams) => {
  try {
    const numericPort = typeof port === 'string' ? parseInt(port, 10) : port;
    if (isNaN(numericPort) || numericPort <= 0 || numericPort > 65535) {
      throw new Error('Invalid port number.');
    }

    if (!username || !password || !host || !database) {
      throw new Error('Missing required MongoDB connection parameters.');
    }

    const mongoUri = `mongodb://${username}:${password}@${host}:${numericPort}/${database}`;

    const MongoDataSource = new DataSource({
      ...defaultMongoConfig,
      url: mongoUri,
      database,
    });

    await MongoDataSource.initialize();
    console.log('MongoDB DataSource has been initialized!');
    return MongoDataSource;
  } catch (error) {
    console.error('Error during MongoDB DataSource initialization', error);
    throw error;
  }
};
