import admin from "../models/Addmin.modul.js";
import jwt from "jsonwebtoken";
import { SIGN } from "../util/jwt.js";
class AddminContr {
  
  async get(req, res) {
    try {
      let data = await admin.select();
      let token = req.query?.token;
      if (token) {
        let dat = jwt.verify(token, "1111");
        let result = await admin.select(null, { email: dat.token });
        if (result.length == 0) {
          return res.send({
            status: 404,
            data: null,
            message: "admin emas",
          });
        } else {
          data = await admin.select(null, { email: dat.token });
        }
      }
      return res.send({
        status: 200,
        data: data,
        message: "ok",
      });
    } catch (error) {
      return res.status(501).json({
        status: 501,
        data: null,
        message: error.message,
      });
    }
  }
  async post(req, res) {
    try {
      const { userName, contact, email } = req.body;
      if (userName && contact && email) {
        let data = await admin.insert(req.body);
        return res.send({
          status: 201,
          data,
          message: "success",
        });
      } else {
        return res.send({
          status: 203,
          data: null,
          message: "malumot toliq emas",
        });
      }
    } catch (error) {
      return res.status(501).json({
        status: 501,
        data: null,
        message: error.message,
      });
    }
  }
  async put(req, res) {
    try {
      const { userName, contact, email } = req.body;
      const id = req.params?.id;
      if (id) {
        if (userName || contact || email) {
          const data = await admin.select(id);
          if (data) {
            data.userName = userName || data.userName;
            data.contact = contact || data.contact;
            data.email = email || data.email;
            let d = await admin.put(id, data);
          }
        } else
          return res.send({
            status: 404,
            data: null,
            message: "malumot o'zgartiring",
          });
      }
    } catch (error) {
      return res.send({
        status: 501,
        data: null,
        message: error.message,
      });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params?.id;
      if (id) {
        const data = admin.select(id);
        if (data.length == 0) return res.send("bunday idli malumot yo'q");
        let d = await admin.delete(id);
        return res.send({
          status: 200,
          data: d,
          message: "success",
        });
      }
    } catch (error) {
      return res.status(501).json({
        status: 501,
        data: null,
        message: error.message,
      });
    }
  }
}

export default new AddminContr();
