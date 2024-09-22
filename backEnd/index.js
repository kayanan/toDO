const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const appMiddleware = require("./middleWare/appMiddleware");


appMiddleware(app);
app.listen(PORT, () => {
  console.log("server is running....");
});
