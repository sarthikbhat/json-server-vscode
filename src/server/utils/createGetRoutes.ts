import express, { Router } from "express";
import { Helper } from "./helper";
import { AddressInfo } from "net";
import { Server } from "http";

export const InitGetRoutes = () => {
  const getRouter: Router = express.Router();

  Helper.getURLKeys.forEach((key) => {
    const encodedKey = encodeURIComponent(key);
    getRouter.get(`/${encodedKey}`, (req, res) => {
      const decodedKey = decodeURIComponent(encodedKey);
      res.json(Helper.getJSONObject[decodedKey]);
    });
  });

  return getRouter;
};

// export default getRouter;
