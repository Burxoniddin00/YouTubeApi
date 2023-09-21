export async function ChekToken(req, res, next) {
  try {
    let { token } = req.headers;
    if (token) {
      return next();
    } else return res.send("login qiling");
  } catch (error) {}
}
