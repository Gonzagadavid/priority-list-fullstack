import connection from './connection.js';

class DBModel {
  constructor(collection) {
    this.collection = collection;
    this.connection = null;
  }

  async findOne(filter = {}) {
    this.connection = await connection();
    const product = await this.connection.collection(this.collection).findOne(filter);
    return product;
  }

  async find(filter = {}) {
    this.connection = await connection();
    const product = await this.connection.collection(this.collection).find(filter).toArray();
    return product;
  }

  async insertOne(item) {
    console.log(item);
    this.connection = await connection();
    const response = await this.connection.collection(this.collection).insertOne(item);
    return response;
  }

  async updateOne(filter, modify) {
    this.connection = await connection();
    const response = await this.connection.collection(this.collection).updateOne(filter, modify);
    return response;
  }

  async deleteOne(filter) {
    this.connection = await connection();
    const response = await this.connection.collection(this.collection).deleteOne(filter);
    return response;
  }
}

export default DBModel;
