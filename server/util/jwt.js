import jwt from "jsonwebtoken";

export function SIGN(payload) {
  return jwt.sign({ token: payload }, "1111", {
    expiresIn: "1 days",
  });
}

export function VERIFY(payload) {
  return jwt.verify(payload, "1111");
}
