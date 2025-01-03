import { StatusBarAlignment, StatusBarItem, window } from "vscode";

export class StatusBarSetup {
  public static statusBarItem: StatusBarItem;

  private static get statusbar() {
    if (!StatusBarSetup.statusBarItem) {
      StatusBarSetup.statusBarItem = window.createStatusBarItem(
        "json-server",
        StatusBarAlignment.Right,
        1111
      );
      StatusBarSetup.statusBarItem.show();
    }

    return StatusBarSetup.statusBarItem;
  }

  static AddToStatusBar() {
    StatusBarSetup.Activate();
  }

  public static Activate() {
    StatusBarSetup.statusbar.text = " $(server) Start JSON Server";
    StatusBarSetup.statusbar.tooltip =
      "Start JSON Server with current open JSON file";
    StatusBarSetup.statusbar.command = "json-server.runServer";
    StatusBarSetup.statusbar.show();
  }

  public static PrepareOffline(port: number) {    
    StatusBarSetup.statusbar.text = `$(loading~spin) Stopping JSON Server : ${port}`;
    StatusBarSetup.statusbar.tooltip = "Stopping the server";
  }

  public static GoOnline(port: number) {
    StatusBarSetup.statusbar.text = `$(plug) Started JSON Server : ${port}`;
    StatusBarSetup.statusbar.tooltip = "Stop the server";
    StatusBarSetup.statusbar.command = "json-server.stopServer";
  }

  public static dispose() {
    StatusBarSetup.statusbar.dispose();
  }
}
