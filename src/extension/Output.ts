import { FileSystemWatcher, OutputChannel, window } from "vscode";

export class Output {
  private static _outPutChannel: OutputChannel;

  private static get outPutChannel() {
    if (!this._outPutChannel) {
      this._outPutChannel = window.createOutputChannel("json-server");
      this._outPutChannel.show();
    }

    return this._outPutChannel;
  }

  public static Init() {
    this.AddOutput("json-server is now active!");
  }

  public static AddOutput(message: string) {
    this.outPutChannel.appendLine(message);
  }
}
