const morgan = require("morgan");
const cors = require("cors");

const appMiddleware = (app) => {
  app.use(cors());
  app.use(morgan("dev"));
  app.get("/hi", (req, res) => {
    res.status(200).json({
      message: "hi",
    });
  });
};

module.exports = appMiddleware;
