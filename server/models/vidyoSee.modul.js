import { Types } from "mongoose";
import vidyoSee from "../schemas/vidyoSee.schema.js";

class VidyoSee {
  async select(_id, filter, option) {
    try {
      let data = await vidyoSee
        .find(filter, option)
        .populate("usersId")
        .populate("usersId")
        .populate("vidyoSee");
      if (_id) {
        data = await vidyoSee
          .findById(_id, option)
          .populate("usersId")
          .populate("usersId")
          .populate("vidyoSee");
      }
      return data;
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await vidyoSee.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    return await vidyoSee.updateOne(
      { _id: new Types.ObjectId(id) },
      { left_date: Date.now() },
      { new: true }
    );
  }
  async updet(_id, obj) {
    try {
      return await vidyoSee.findByIdAndUpdate({ _id }, obj);
    } catch (error) {
      return error.message;
    }
  }
}

export default new VidyoSee();
