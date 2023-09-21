import { Types } from "mongoose";
import subscribers from "../schemas/subscribers.schema.js";

class Subscribers {
  async select(_id, filter, option) {
    try {
      let data = await subscribers
        .find(filter, option)
        .populate("usersId")
        .populate("subscribers")
        .populate("subscribersMe");
      if (_id) {
        data = await subscribers
          .findById(_id, option)
          .populate("usersId")
          .populate("subscribers")
          .populate("subscribersMe");
      }
      return data;
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await subscribers.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async updet(_id, obj) {
    try {
      return await subscribers.findByIdAndUpdate({ _id }, obj);
    } catch (error) {
      return error.message;
    }
  }
}

export default new Subscribers();
