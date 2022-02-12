import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { MONGO_DB_URL = 'localhost' } = process.env;
const { DB_NAME = 'TodoList' } = process.env;

let db = null;

const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    }));

export default connection;
