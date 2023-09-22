import users from "../models/users.Modul.js";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import { SIGN } from "../util/jwt.js";
export const GET = async (req, res) => {
  try {
    let { token } = req.query;
    let data = await users.select();
    if (token) {
      let dat = jwt.verify(token, "1111");
      let user = await users.select(null, { email: dat.token });
      if (user.length == 0)
        return res.send({
          status: 404,
          message: "Bunday users yo'q regiseter qiling",
        });
      data = user;
    }
    return res.send({
      status: 202,
      data,
      message: "ok",
    });
  } catch (error) {
    return res.send({
      status: 404,
      message: error.message,
    });
  }
};

export const POST = async (req, res) => {
  try {
    const { first_name, email, contact, last_name } = req.body;
    const file = req.files?.file;
    if (first_name && email && contact && last_name && file) {
      let us = await users.select(null, { email });
      if (us.length == 0) {
        let tel = await users.select(null, { contact });
        if (tel.length == 0) {
          let name = last_name + new Date().getMilliseconds();
          let vidname = file.name.split(".");
          let filname = file.name.replace(/\s/g, "");
          filname = filname.split(".");
          filname = name + "." + filname[filname.length - 1];
          file.mv(path.join(process.cwd(), "public/img", filname));
          let link = `/img/${name + "." + vidname[vidname.length - 1]}`;
          let obj = {
            first_name,
            email,
            contact,
            last_name,
            usersImgeLink: link,
          };
          let data = await users.insert(obj);
          res.send({
            status: 200,
            data,
            Token: SIGN(email, "1111"),
            message: "Rahmat",
          });
        } else
          return res.send({
            status: 404,
            message:
              "buday telfon raqam bilan oldi registrasi qilinga siz login qiling yoki boshqa telfon Raqam bilan bilan yana urunib koring",
          });
      } else
        return res.send({
          status: 404,
          message:
            "buday emali bilan oldi registrasi qilinga siz login qiling yoki boshqa emali bilan yana urunib koring",
        });
    } else
      return res.send({
        status: 404,
        message: "malumot toliq emasa",
      });
  } catch (error) {
    return res.send({
      status: 404,
      message: error.message,
    });
  }
};

export const PUT = async (req, res) => {
  try {
    const id = req.params?.id;
    const { first_name, last_name, contact, vidyoId, vidyoSee } = req.body;
    const file = req.files?.file;
    if (id) {
      if (vidyoSee) {
        let us = await users.select(id);
        if (us) {
          let da = us.subscribers.find((e) => e != subscribers);
          if (!da) {
            us.subscribers.push(vidyoSee);
          }
          let r = await users.updet(id, us);
        }
      } else if (first_name || last_name || contact) {
        let user = await users.select(id);
        if (!user) {
          return res.send({
            status: 404,
            message: "Bunday users yo'q regiseter qiling",
          });
        } else if (user) {
          if (file) {
            let userPath = user.usersImgeLink.split("/")[2];
            userPath = path.join(process.cwd(), "public/img/") + userPath;
            fs.unlinkSync(userPath);
            let name = last_name + new Date().getMilliseconds();
            let vidname = file.name.split(".");
            let filname = file.name.replace(/\s/g, "");
            filname = filname.split(".");
            filname = name + "." + filname[filname.length - 1];
            file.mv(path.join(process.cwd(), "public/img", filname));
            let link = `/img/${name + "." + vidname[vidname.length - 1]}`;
            user.usersImgeLink = link || user.usersImgeLink;
            user.first_name = first_name || user.first_name;
            user.last_name = last_name || user.last_name;
            user.contact = contact || user.contact;
            let data = await users.updet(id, user);
            return res.send({
              status: 200,
              data: [data],
              message: "malumotlar o'zgartirldi",
            });
          } else {
            user.first_name = first_name || user.first_name;
            user.last_name = last_name || user.last_name;
            user.contact = contact || user.contact;
            let u = await users.updet(id, user);
            let data = await users.select(id);
            return res.send({
              status: 200,
              data: [data],
              message: "malumotlar o'zgartirldi",
            });
          }
        }
      }
    }
  } catch (error) {
    res.send({
      status: 404,
      data: null,
      message: error.message,
    });
  }
};
