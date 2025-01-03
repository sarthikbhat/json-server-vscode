import express from "express";
import { Express } from "express-serve-static-core";
import { Server } from "http";
import { AddressInfo } from "net";
import path from "path";
import { JSONServeRoutes } from "./createRoutes";
import { Helper } from "./utils/helper";

export let PORT = 0;
let app: Express;

let server: Server;

export const startServer = function () {
  try {
    app = express();

    app.set("view engine", "ejs");
    app.engine("ejs", require("ejs").__express);

    app.set("views", path.join(__dirname, "views"));
    app.use(express.static(__dirname + "/public"));

    // Initailise Routes ROUTES

    app.use("/", JSONServeRoutes());

    return new Promise((resolve, reject) => {
      server = app.listen(0, () => {
        const serverAddress = server.address() as AddressInfo;
        PORT = serverAddress.port;
        console.log(`Example app listening on port ${PORT}`);
      });
      Helper.setServer(server);
      resolve((server.address() as AddressInfo).port);
    });
  } catch (error) {
    console.error(error);
    return new Promise((resolve, reject) => {
      reject(error);
    });
    // throw error;
  }
};

export const stopServerConnections = function () {
  try {
    console.log("Closing server on Port - ", PORT);
    return new Promise((resolve, reject) => {
      server.close(() => {
        console.log("Closed server on Port - ", PORT);
      });
      resolve(true);
    });
  } catch (error) {
    console.error(error);
    return new Promise((resolve, reject) => {
      reject(false);
    });
  }
};

// const obj = {
//   name: "json-server",
//   displayName: "JSON Server",
//   description:
//     "Easy to use json server, to create a http server from a json file.",
//   version: "0.0.1",
//   publisher: "Sarthik Bhat",
//   author: {
//     name: "Sarthik Bhat",
//     url: "https://github.com/sarthikbhat",
//   },
//   engines: {
//     vscode: "^1.91.0",
//   },
//   categories: ["Other"],
//   keywords: [
//     "json preview",
//     "live preview",
//     "live reload",
//     "server",
//     "open in browser",
//     "multi-root ready",
//   ],
//   preview: true,
//   galleryBanner: {
//     color: "#0e51af",
//     theme: "dark",
//   },
//   activationEvents: ["onStartupFinished"],
//   main: "./dist/extension.js",
//   license: "MIT",
//   icon: "images/icon.png",
//   repository: {
//     type: "git",
//     url: "https://github.com/sarthikbhat/json-server-vscode.git",
//   },
//   scripts: {
//     "vscode:prepublish": "npm run package",
//     start: "nodemon src/server/server.ts",
//     compile: "webpack",
//     watch: "webpack --watch",
//     package: "webpack --mode production --devtool hidden-source-map",
//     "compile-tests": "tsc -p . --outDir out",
//     "watch-tests": "tsc -p . -w --outDir out",
//     pretest: "npm run compile-tests && npm run compile && npm run lint",
//     lint: "eslint src --ext ts",
//     test: "vscode-test",
//   },
//   devDependencies: {
//     "@types/ejs": "^3.1.5",
//     "@types/express": "^5.0.0",
//     "@types/mocha": "^10.0.7",
//     "@types/node": "20.x",
//     "@types/swagger-jsdoc": "^6.0.4",
//     "@types/swagger-ui-express": "^4.1.7",
//     "@types/vscode": "^1.91.0",
//     "@typescript-eslint/eslint-plugin": "^7.14.1",
//     "@typescript-eslint/parser": "^7.11.0",
//     "@vscode/test-cli": "^0.0.9",
//     "@vscode/test-electron": "^2.4.0",
//     concurrently: "^9.1.2",
//     "copy-webpack-plugin": "^12.0.2",
//     eslint: "^8.57.0",
//     nodemon: "^3.1.9",
//     "ts-loader": "^9.5.1",
//     "ts-node": "^10.9.2",
//     typescript: "^5.4.5",
//     webpack: "^5.92.1",
//     "webpack-cli": "^5.1.4",
//   },
//   dependencies: {
//     ejs: "^3.1.10",
//     express: "^4.21.1",
//     "swagger-jsdoc": "^6.2.8",
//     "swagger-ui-express": "^5.0.1",
//   },
// };

// Helper.setJSONObject(obj);
// startServer(5000);
