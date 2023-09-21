import subscrib from "../models/subscribers.modul.js";
export const GET = async (req, res) => {
  try {
    const id = req.params?.id;
    let { usersId } = req.query;
    let data = await subscrib.select();
    if (id) {
      data = await subscrib.select(id);
    } else if (usersId) {
      let rasd = await subscrib.select(null, { usersId });
      return res.send({
        status: 200,
        data: rasd,
        message: "ok",
      });
    }
    res.send({
      status: 202,
      data,
      message: "ok",
    });
  } catch (error) {
    return res.send({
      status: 404,
      data: null,
      message: error.message,
    });
  }
};
export const PUT = async (req, res) => {
  try {
    const id = req.params?.id;
    const { usersId, usersIdNo, usId } = req.body;
    if (id) {
      if (usersId && id) {
        let me = await subscrib.select(null, { usersId: id });
        let you = await subscrib.select(null, { usersId: usersId });
        if (you.length == 0 && me.length == 0) {
          let objYou = {
            usersId: usersId,
            subscribers: [id],
            subscribersMe: [],
          };
          let y = await subscrib.insert(objYou);
          let objme = {
            usersId: id,
            subscribers: [],
            subscribersMe: [usersId],
          };
          let m = await subscrib.insert(objme);
          let ruslat = await subscrib.select();
          return res.send({ message: "ok", status: 200, data: ruslat });
        } else if (you.length == 0) {
          let objYou = {
            usersId: usersId,
            subscribers: [id],
            subscribersMe: [],
          };
          me.subscribersMe.push(usersId);
          let y = await subscrib.insert(objYou);
          let m = await subscrib.updet(me[0]._id, me);
          let ruslat = await subscrib.select();
          return res.send({ message: "ok", status: 200, data: ruslat });
        } else if (me.length == 0) {
          let objme = {
            usersId: id,
            subscribers: [],
            subscribersMe: [usersId],
          };
          you.subscribers.push(id);
          let y = await subscrib.updet(you[0]._id, you);
          let m = await subscrib.insert(objme);
          let ruslat = await subscrib.select();
          return res.send({ message: "ok", status: 200, data: ruslat });
        } else if (me.length != 0 && you.length != 0) {
          you.subscribers.push(id);
          me.subscribersMe.push(usersId);
          let y = await subscrib.updet(you[0]._id, you);
          let m = await subscrib.updet(me[0]._id, me);
          let ruslat = await subscrib.select();
          return res.send({ message: "ok", status: 200, data: ruslat });
        } else {
          return res.send({
            status: 404,
            data: null,
            message: "no Submit",
          });
        }
      } else if (usersIdNo) {
        let data = await subscrib.select(id);
        if (data.length != 0) {
          let useNo = await subscrib.select(null, { usersId: usersIdNo });
          if (useNo.length == 0)
            return res.send({
              status: 404,
              data: null,
              message: "bunday idlik malumot yo'q",
            });
          let reslt = useNo[0].subscribers.filter((e) => {
            if (e.email != data.usersId.email) {
              return e;
            }
          });
          let reslt2 = data.subscribersMe.filter((e) => {
            if (e.email != useNo[0].usersId.email) {
              return e;
            }
          });
          useNo[0].subscribers = reslt;
          data.subscribersMe = reslt2;
          let y = await subscrib.updet(useNo[0]._id, useNo);
          let m = await subscrib.updet(data._id, data);
          let ruslat = await subscrib.select();
          return res.send({ message: "ok", status: 200, data: ruslat });
        } else
          return res.send({
            status: 404,
            data: null,
            message: "bunday idlik malumot yo'q",
          });
      }
    }
  } catch (error) {
    return res.send({
      status: 404,
      data: null,
      message: error.message,
    });
  }
};
export const DELET = async (req, res) => {
  try {
    const { subscribersSee } = req.body;
    const id = req.params?.id;
    if (id) {
      let data = await subscribers.select(id);
      if (data.length == 0)
        return res.send({
          status: 404,
          data: null,
          message: "malumot yo'q malumot yozing",
        });
      if (subscribersSee) {
        let f = data.subscribersSee.filter((e) => e._id != subscribersSee);
        data.subscribersSee = f;
        let s = await subscribers.updet(id, data);
        let da = await subscribers.select();
        return res.send({
          status: 200,
          data: da,
          message: "ok",
        });
      }
    }
  } catch (error) {
    return res.send({
      status: 404,
      data: null,
      message: error.message,
    });
  }
};

