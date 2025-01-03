import { commands, ExtensionContext } from "vscode";
import { StatusBarSetup } from "./extension/StatusBarSetup";
import { FileWatcher } from "./extension/FileWatcher";
import { Output } from "./extension/Output";
import { Commands } from "./extension/Commands";

export function activate(context: ExtensionContext) {
  console.log("json-server is now active!");
  const command = new Commands();

  Output.Init();
  StatusBarSetup.AddToStatusBar();
  FileWatcher.InitWatcher();

  const runServer = commands.registerCommand(
    "json-server.runServer",
    async (e) => {
      command.startServer();
    }
  );

  const stopServer = commands.registerCommand(
    "json-server.stopServer",
    async () => {
      command.stopServer();
    }
  );

  context.subscriptions.push(runServer);
  context.subscriptions.push(stopServer);
}

export function deactivate() {}
