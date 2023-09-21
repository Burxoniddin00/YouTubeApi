import messege from "../models/message.model.js";

class MessegeContr {
  async get(req, res) {
    try {
      const { vidyoId } = req.query;
      let data = await messege.select();
      if (vidyoId) {
        data = await messege.select(null, { vidyoId });
      }
      return res.send({
        status: 200,
        data,
        message: "messeges",
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
      const { usersId, vidyoId, text } = req.body;
      if (usersId && vidyoId && text) {
        let data = await messege.insert(req.body);
        let d = await messege.select(null, { vidyoId });
        return res.send({
          status: 201,
          data: d,
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
  async delete(req, res) {
    try {
      const id = req.params?.id;
      if (id) {
        const data = messege.select(id);
        let { vidyoId } = req.body;
        if (vidyoId) {
          if (data.length == 0) return res.send("bunday idli malumot yo'q");
          let d = await messege.delete(id);
          let respos = await messege.select(null, { vidyoId });
          return res.send({
            status: 200,
            data: respos,
            message: "success",
          });
        } else {
          return res.send({
            status: 404,
            data: null,
            message: "malumot yo'q",
          });
        }
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
      const { vidyoId, usersId, vidyoIdlik, vidyoIddont, vidyoTitel } =
        req.body;
      const id = req.params?.id;
      if (id) {
        if (vidyoId && usersId && vidyoIdlik) {
          const data = await messege.select(id);
          if (data) {
            let r = data.messageLiked.find((e) => e == usersId);
            if (!r) {
              data.messageLiked.push(usersId);
              data.messageDontLiked = data.messageDontLiked.filter(
                (e) => e != usersId
              );
            } else {
              data.messageLiked = data.messageLiked.filter((e) => e != usersId);
            }
            let d = await messege.put(id, data);
            let rsul = await messege.select(null, { vidyoId });
            return res.send({
              status: 200,
              data: rsul,
              message: "ok",
            });
          } else {
            return res.send({
              status: 404,
              data: null,
              message: "malumot yo'q",
            });
          }
        } else if (vidyoId && usersId && vidyoIddont) {
          const data = await messege.select(id);
          if (data) {
            let r = data.messageDontLiked.find((e) => e == usersId);
            if (!r) {
              data.messageDontLiked.push(usersId);
              data.messageLiked = data.messageLiked.filter((e) => e != usersId);
            } else {
              data.messageDontLiked = data.messageDontLiked.filter(
                (e) => e != usersId
              );
            }
            let d = await messege.put(id, data);
            let rsul = await messege.select(null, { vidyoId });
            return res.send({
              status: 200,
              data: rsul,
              message: "ok",
            });
          } else {
            return res.send({
              status: 404,
              data: null,
              message: "malumot yo'q",
            });
          }
        } else if (vidyoTitel && vidyoId) {
          const data = await messege.select(id);
          if (data) {
            data.text = vidyoTitel;
            let r = await messege.put(id, data);
            if (r) {
              let d = await messege.select(null, { vidyoId });
              return res.send({
                status: 200,
                data: d,
                message: "Malumot o'zgardi",
              });
            } else {
              return res.send({
                status: 404,
                data: null,
                message: "Malumot o'zgarmadi",
              });
            }
          } else {
            return res.send({
              status: 404,
              data: null,
              message: "malumot yo'q",
            });
          }
        } else {
          return res.send({
            status: 404,
            data: null,
            message: "malumot yo'q",
          });
        }
      }
    } catch (error) {
      return res.send({
        status: 501,
        data: null,
        message: error.message,
      });
    }
  }
}

export default new MessegeContr();
