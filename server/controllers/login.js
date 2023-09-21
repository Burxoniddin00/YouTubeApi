import sendMail from "../middlewares/sender.js";
import users from "../models/users.Modul.js";
import addmin from "../models/Addmin.modul.js";
import { SIGN } from "../util/jwt.js";
import fs from "fs";

class Login {
  async login(req, res) {
    try {
      const { code, email } = req.body;
      let data = await JSON.parse(
        fs.readFileSync(process.cwd() + "/password.json", "utf-8")
      );
      if (code && email) {
        if (data.length == 0)
          return res.send({
            status: 404,
            message: "malumot yo'q",
          });
        for (let k of data) {
          let arr = data.filter((e) => e.email != email);
          if (k.email == email && code == k.code) {
            fs.writeFileSync("./password.json", JSON.stringify(arr));
            res.send({
              status: 200,
              message: "Rahmat",
              Token: SIGN(email, "1111"),
            });
          } else {
            return res.send({
              status: 404,
              message: "Siz kira olmaysiz siz register qiling",
            });
          }
        }
      } else
        return res.send({
          status: 404,
          message: "Siz kira olmaysiz siz register qiling",
        });
    } catch (error) {}
  }
  async Password(req, res) {
    try {
      let { email, contact } = req.body;
      if (email && contact) {
        let usersNam = await users.select(null, { email, contact });
        let admin = await addmin.select(null, { email, contact });
        if (usersNam.length != 0 || admin.length != 0) {
          const text = "Asslomu alekum";
          let code = Math.floor(Math.random() * 9000 + 1000);
          let send = await sendMail(email, text, code);
          if (!send) return res.send("bunday email topilmadi");
          let data = await JSON.parse(
            fs.readFileSync(process.cwd() + "/password.json", "utf-8")
          );
          let obj = { email, code };
          data.push(obj);
          fs.writeFileSync("./password.json", JSON.stringify(data));
          await res.send({
            status: 200,
            message: email + " gmailga habar yuborildi ",
          });
        } else
          res.send({
            status: 404,
            message: "Siz kira olmaysiz siz register qiling",
          });
      } else
        res.send({
          status: 404,
          message: "Malumot yozing",
        });
    } catch (error) {
      res.send({
        status: 404,
        message: error.message,
      });
    }
  }
}

export default new Login();
