import { ObjectId } from 'mongodb';
import DBModel from './DBModel.js';

class TaskModel extends DBModel {
  constructor() {
    super('tasks');
  }

  async findTaskById(id) {
    const task = await this.findOne({ _id: ObjectId(id) });

    return task;
  }

  async updateTask(id, task) {
    await this.updateOne({ _id: ObjectId(id) }, { $set: { ...task, updated: new Date() } });
  }

  async removeTask(id) {
    await this.deleteOne({ _id: ObjectId(id) });
  }
}

export default TaskModel;
