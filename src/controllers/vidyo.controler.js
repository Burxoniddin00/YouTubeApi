import vidyo from "../models/vidyo.Modul.js";
import path from "path";
import admin from "../models/Addmin.modul.js";
import fs from "fs";

export const GET = async (req, res) => {
  try {
    const id = req.params?.id;
    let data = await vidyo.select();
    let { usersId, q, vidyoId } = req.query;
    if (id) {
      data = await vidyo.select(id);
    } else if (usersId) {
      data = await vidyo.select(null, { usersId });
    } else if (q) {
      data = await vidyo.select(null, { q });
    } else if (vidyoId) {
      let foe = data.filter((e) => e._id != vidyoId);
      data = foe;
    }
    res.send(data);
  } catch (error) {}
};

export const POST = async (req, res) => {
  try {
    const { usersId, vidyoTitel } = req.body;
    const file = req.files?.file;
    if (usersId && vidyoTitel && file) {
      let name = new Date().getMilliseconds();
      let vidname = file.name.split(".");
      let filname = file.name.replace(/\s/g, "");
      filname = filname.split(".");
      filname = name + "." + filname[filname.length - 1];
      file.mv(path.join(process.cwd(), "public/vid", filname));
      let link = `/vid/${name + "." + vidname[vidname.length - 1]}`;
      let obj = {
        usersId,
        vidyoTitel,
        vidyoLink: link,
      };
      let po = await vidyo.insert(obj);
      let data = await vidyo.select(null, { usersId });
      res.send({ status: 200, data, message: "malumot qo'shildi" });
    } else return res.send({ status: 400, message: "malumot toliq emasa" });
  } catch (error) {
    return res.send({ status: 404, message: error.message });
  }
};

export const PUT = async (req, res) => {
  try {
    const id = req.params?.id;
    const {
      vidyoTitel,
      vidyoLiked,
      vidyoDontLiked,
      vidyoSee,
      usersId,
      vidyoLikedChage,
      vidyoDontLikedChage,
    } = req.body;
    const file = req.files?.file;
    if (
      vidyoTitel ||
      vidyoLiked ||
      vidyoDontLiked ||
      vidyoLikedChage ||
      vidyoSee ||
      file ||
      vidyoDontLikedChage
    ) {
      if (vidyoLiked) {
        let d = await vidyo.select(id);
        d.vidyoLiked.push(vidyoLiked);
        d.vidyoDontLiked = d.vidyoDontLiked.filter((e) => e != vidyoLiked);
        let r = await vidyo.updet(id, d);
      } else if (vidyoLikedChage) {
        let d = await vidyo.select(id);
        d.vidyoLiked = d.vidyoLiked.filter((e) => e != vidyoLikedChage);
        let r = await vidyo.updet(id, d);
      } else if (vidyoDontLiked) {
        let d = await vidyo.select(id);
        d.vidyoDontLiked.push(vidyoDontLiked);
        d.vidyoLiked = d.vidyoLiked.filter((e) => e != vidyoDontLiked);
        let r = await vidyo.updet(id, d);
      } else if (vidyoDontLikedChage) {
        let d = await vidyo.select(id);
        d.vidyoDontLiked = d.vidyoDontLiked.filter(
          (e) => e != vidyoDontLikedChage
        );
        let r = await vidyo.updet(id, d);
      } else if (vidyoSee) {
        let d = await vidyo.select(id);
        let da = d.vidyoSee.filter((e) => e == vidyoSee);
        if (da.length == 0) {
          d.vidyoSee.push(vidyoSee);
          let r = await vidyo.updet(id, d);
        }
      } else if (vidyoTitel && usersId) {
        let d = await vidyo.select(id);
        d.vidyoTitel = vidyoTitel || d.vidyoTitel;
        let r = await vidyo.updet(id, d);
        let data = await vidyo.select(null, { usersId });
        return res.send(data);
      }
      let data = await vidyo.select(id);

      res.send(data);
    }
  } catch (error) {
    return res.send(error.message);
  }
};

export const DLETE = async (req, res) => {
  try {
    const id = req.params?.id;
    const { usersId, adminId } = req.body;
    if (id) {
      let data = await vidyo.select(id);
      let users = await vidyo.select(null, { usersId });
      if (data.length != 0 && usersId && users.length != 0) {
        let vi = await vidyo.select(id);
        let userPath = vi.vidyoLink.split("/")[2];
        userPath = path.join(process.cwd(), "public/vid/") + userPath;
        fs.unlinkSync(userPath);
        let d = await vidyo.delete(id);
        let data = await vidyo.select(null, { usersId });
        res.send({ message: "delet vidyo", data, status: 200 });
      } else if (data.length != 0 && adminId) {
        let ad = await admin.select(adminId);
        if (ad) {
          let vi = await vidyo.select(id);
          let userPath = vi.vidyoLink.split("/")[2];
          userPath = path.join(process.cwd(), "public/vid/") + userPath;
          fs.unlinkSync(userPath);
          let d = await vidyo.delete(id);
          let data = await vidyo.select();
          res.send({ message: "delet vidyo", data, status: 200 });
        } else {
          res.send({
            status: 404,
            message: "siz bu vidyodi ochra olmaysiz siz admin emasiz",
          });
        }
      } else {
        return res.send({ status: 404, messsage: "bunday idlik malumot yo'q" });
      }
    }
  } catch (error) {
    return res.send({ status: 404, messsage: error.message });
  }
};
