import express from "express";
import { Server } from "http";
import { AddressInfo } from "net";
import path from "path";

export let PORT = 0;
const app = express();

const BASE_PATH = path.join(__dirname, "../src/server");

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

app.set("views", path.join(BASE_PATH, "/views"));
app.use(express.static(BASE_PATH + "/public"));

let server: Server;

type CustomObject = {
  [key: string]: any;
};

export const startServer = function (jsonObj: CustomObject) {
  const URLS: string[] = [];

  const URL_KEYS = Object.keys(jsonObj);

  try {
    server = app.listen(0, () => {
      const serverAddress = server.address() as AddressInfo;
      PORT = serverAddress.port;
      console.log(`Example app listening on port ${PORT}`);
    });

    app.get("/", (req, res) => {
      const sendURLs = URL_KEYS.map((key) => {
        const serverAddress = server.address() as AddressInfo;
        return `http://127.0.0.1:${serverAddress.port}/${key}`;
      });
      res.render("view", { data: sendURLs });
      // res.json(sendURLs);
    });

    URL_KEYS.forEach((key) => {
      const serverAddress = server.address() as AddressInfo;
      const URL = `http://127.0.0.1:${serverAddress.port}/${key}`;
      URLS.push(URL);
      console.log(`Endpoint active at ${URL}`);
      app.get(`/${key}`, (req, res) => {
        res.json(jsonObj[key]);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const stopServerConnections = function () {
  try {
    console.log("Closing server on Port - ", PORT);
    server.close(() => {
      console.log("closed");
    });
    return true;
  } catch (error) {
    console.error(error);
  }
};
