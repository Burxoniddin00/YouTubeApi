import vidyo from "../models/vidyoSee.modul.js";

export const GET = async (req, res) => {
  try {
    const id = req.params?.id;
    let data = await vidyo.select();
    if (id) {
      data = await vidyo.select(null, { usersId: id });
    }
    res.send({
      status: 202,
      data,
      message: "ok",
    });
  } catch (error) {}
};

export const PUT = async (req, res) => {
  try {
    const id = req.params?.id;
    const { usersId, vidyoSee } = req.body;
    if (id) {
      let data = await vidyo.select(null, { usersId: id });
      if (data.length == 0) {
        if (usersId && vidyoSee) {
          let cret = await vidyo.insert(req.body);
          res.send(cret);
        } else {
          return res.send({
            status: 404,
            data: null,
            message: "malumot yo'q malumot yozing",
          });
        }
      } else {
        if (usersId && vidyoSee) {
          let vi = await vidyo.select(data[0]._id);
          let d = vi.vidyoSee.find((e) => e._id == vidyoSee);
          if (!d) {
            vi.vidyoSee.push(vidyoSee);
          }
          let s = await vidyo.updet(data[0]._id, vi);
          return res.send({
            status: 202,
            data: s,
            message: "ok",
          });
        } else {
          return res.send({
            status: 404,
            data: null,
            message: "malumot yo'q malumot yozing",
          });
        }
      }
    } else {
      res.send({
        status: 404,
        data: null,
        message: "not foun id",
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};

export const DELET = async (req, res) => {
  try {
    const { vidyoSee } = req.body;
    const id = req.params?.id;
    if (id) {
      let data = await vidyo.select(id);
      if (data.length == 0)
        return res.send({
          status: 404,
          data: null,
          message: "malumot yo'q malumot yozing",
        });
      if (vidyoSee) {
        let f = data.vidyoSee.filter((e) => e._id != vidyoSee);
        data.vidyoSee = f;
        let s = await vidyo.updet(id, data);
        let da = await vidyo.select();
        return res.send({
          status: 200,
          data: da,
          message: "ok",
        });
      }
    }
  } catch (error) {
    return res.send({
      status: 200,
      data: da,
      message: error.message,
    });
  }
};
