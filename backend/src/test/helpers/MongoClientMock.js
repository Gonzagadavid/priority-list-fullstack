import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

let connection = null;

const MongoClientMock = async () => {
  if (connection) return connection;

  const DBServer = await MongoMemoryServer.create();
  const URLMock = await DBServer.getUri();

  connection = await MongoClient.connect(URLMock, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection;
};

export default MongoClientMock;
