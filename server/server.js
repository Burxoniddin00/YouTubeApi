import expres from "express";
import cors from "cors";
const PORT = 4041;
import fileUpload from "express-fileupload";
import "./db/mongo.js";
import { UsersRouters } from "./routers/users.routes.js";
import { vidyoRouters } from "./routers/vidyo.routes.js";
import massageRouters from "./routers/message.routes.js";
import { loginRouters } from "./routers/login.routes.js";
import { vidyoSeeRouters } from "./routers/vidyoSee.routes.js";
import { SubscribersRouters } from "./routers/subscribers.routes.js";
import addminRouters from "./routers/admin.routes.js";

const app = expres();
app.use(expres.static("public"));
app.use(cors());
app.use(expres.json());
app.use(fileUpload());

app.use("/users", UsersRouters);
app.use("/vidyo", vidyoRouters);
app.use("/message", massageRouters);
app.use("/login", loginRouters);
app.use("/vidyosee", vidyoSeeRouters);
app.use("/subscriber", SubscribersRouters);
app.use("/admin", addminRouters);

app.use("/vid", expres.static("/vid"));
app.use("/img", expres.static("/img"));

app.listen(PORT, console.log("SERTEVR RUN >>>>>>>"));
