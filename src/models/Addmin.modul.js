import adminModel from "../schemas/admin.schema.js";

class Admin {
  async select(id, filter, option) {
    try {
      if (id) return await adminModel.findById(id, option);
      return await adminModel.find(filter, option);
    } catch (error) {
      return error.admin;
    }
  }
  async insert(body) {
    try {
      return await adminModel.create(body);
    } catch (error) {
      return error.admin;
    }
  }
  async delete(id) {
    const filter = { _id: id };
    return await adminModel.deleteOne(filter);
  }
  async put(id, upt) {
    try {
      const filter = { _id: id };
      let doc = await adminModel.findOneAndUpdate(filter, upt);
      return doc;
    } catch (error) {
      return error.admin;
    }
  }
}

export default new Admin();
