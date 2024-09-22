const express =require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("../router");
const dbConnection = require("../db/dbConnection");

const appMiddleware = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  dbConnection();

  mainRouter(app);

  app.use((req, res, next) => {
    const error = new Error("page not found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      "Error occured": error.message,
    });
  });
};

module.exports = appMiddleware;
