import express, { Router } from "express";
import { Server } from "http";
import { InitGetRoutes } from "./utils/createGetRoutes";
import { Helper } from "./utils/helper";
const router: Router = express.Router();

export const JSONServeRoutes = () => {
  const server = Helper.getServer;
  // GET Routes Initialized
  console.log("hello");
  router.get("/", (req, res) => {
    console.log(Helper.getURLS());

    res.render("view", { data: Helper.getURLS() });
  });

  router.use("/api/", InitGetRoutes());

  return router;
};
