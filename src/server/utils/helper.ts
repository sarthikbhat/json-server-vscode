import { Server } from "http";
import { AddressInfo } from "net";

export type CustomObject = {
  [key: string]: any;
};

export class Helper {
  private static _JSONObject: CustomObject;
  private static _URL_KEYS: string[];
  private static server: Server;

  public static get getServer() {
    return this.server;
  }

  public static setServer(server: Server) {
    this.server = server;
  }

  public static get getJSONObject() {
    return this._JSONObject;
  }

  public static setJSONObject(jsonObj: CustomObject) {
    this._JSONObject = { ...jsonObj };
    this.setURLKeys();
  }

  public static get getURLKeys() {
    return this._URL_KEYS;
  }

  public static setURLKeys() {
    this._URL_KEYS = [...Object.keys(this._JSONObject)];
  }

  public static getURLS() {
    const get = this.getURLKeys.map((key) => {
      const serverAddress = Helper.getServer.address() as AddressInfo;
      const encodedKey = encodeURIComponent(key);
      return `http://127.0.0.1:${serverAddress.port}/api/${encodedKey}`;
    });
    return {
      get,
      post: [],
      put: [],
      patch: [],
      delete: [],
    };
  }
}
