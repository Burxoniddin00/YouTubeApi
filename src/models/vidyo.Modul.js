import { Types } from "mongoose";
import vidyo from "../schemas/vidyo.shema.js";

class Vidyo {
  async select(_id, filter, option) {
    try {
      const q = filter?.q;
      const filters = {};
      if (q) {
        filters[`$or`] = [
          {
            vidyoTitel: {
              $regex: new RegExp(q, "i"),
            },
          },
        ];
        let f = await vidyo.find({ ...filters }).populate("usersId");
        return f;
      }
      let data = await vidyo.find({ ...filter, ...option }).populate("usersId");
      if (_id) {
        data = await vidyo.findById(_id, option).populate("usersId");
      }
      return data;
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await vidyo.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    try {
      const filter = { _id: id };
      return await vidyo.deleteOne(filter);
    } catch (e) {
      return e.message;
    }
  }
  async updet(_id, obj) {
    try {
      return await vidyo.findByIdAndUpdate({ _id }, obj);
    } catch (error) {
      return error.message;
    }
  }
}

export default new Vidyo();
