import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import HeroRouter from "./routes/HeroRouter";

//Creates and configures an ExpressJS web server
class App {
  // ref to Express instance
  public express: express.Application;

  // run configuration methods on the Express instance
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // configure api endpoints
  private routes(): void {
    let router = express.Router();
    router.get("/", (req, res, next) => {
      res.json({
        message: "whoa, yeah!"
      });
    });
    this.express.use("/", router);
    this.express.use("/api/v1/Heroes", HeroRouter);
  }
}

export default new App().express;
