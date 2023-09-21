import messageModel from "../schemas/message.schema.js";

class Message {
  async select(id, filter, option) {
    try {
      if (id)
        return await messageModel
          .findById(id, option)
          .populate("usersId")
          .populate("vidyoId")
          
      return await messageModel
        .find(filter, option)
        .populate("usersId")
        .populate("vidyoId")
        .sort({ _id: -1 });
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await messageModel.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    const filter = { _id: id };
    return await messageModel.deleteOne(filter);
  }
  async put(id, upt) {
    try {
      const filter = { _id: id };
      let doc = await messageModel.findOneAndUpdate(filter, upt);
      return doc;
    } catch (error) {
      return error.message;
    }
  }
}

export default new Message();
