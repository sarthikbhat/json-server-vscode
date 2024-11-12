import {
  commands,
  env,
  ExtensionContext,
  Selection,
  StatusBarAlignment,
  Uri,
  window,
} from "vscode";
import { PORT, startServer, stopServerConnections } from "./server/server";

export function activate(context: ExtensionContext) {
  console.log("json-server is now active!");

  let port;
  const item = window.createStatusBarItem(
    "json-server",
    StatusBarAlignment.Right,
    1111
  );

  item.text = " $(server) Start JSON Server";
  item.tooltip = "Start JSON Server with current open JSON file";
  item.command = "json-server.runServer";
  item.show();

  const runServer = commands.registerCommand(
    "json-server.runServer",
    async () => {
      const currTextEditor = window.activeTextEditor;
      const currText = currTextEditor?.document;

      try {
        if (currText) {
          const parseJSON = JSON.parse(currText.getText());
          port = await startServer(parseJSON);
          item.text = `$(plug) Started JSON Server : ${PORT}`;
          item.tooltip = "Stop the server";
          item.command = "json-server.stopServer";
          window
            .showInformationMessage(
              `Live Server is now active: ${PORT}`,
              "Open"
            )
            .then((selection) => {
              if (selection?.toLowerCase() === "open") {
                env.openExternal(Uri.parse(`http://127.0.0.1:${PORT}`));
              }
            });
        }
      } catch (error) {
        window.showErrorMessage("Please provide a valid JSON file");
      }
    }
  );

  const stopServer = commands.registerCommand(
    "json-server.stopServer",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      //   const currTextEditor = window.activeTextEditor;
      //   const currText = currTextEditor?.document;
      //   item.
      try {
        const close = stopServerConnections();
        if (close) {
          item.text = " $(server) Start JSON Server";
          item.tooltip = "Start JSON Server with current open JSON file";
          item.command = "json-server.runServer";
        }
        //     if (currText) {
        //       const parseJSON = JSON.parse(currText.getText());
        //       port = await startServer(parseJSON);
        //       console.log(port);
        //       item.text = `$(plug) Started JSON Server : ${PORT}`;
        //       //   window.setStatusBarMessage(
        //       //     `$(plug) Started JSON Server : ${PORT}`
        //       //   );
        //       // startSer
        //     }
      } catch (error) {
        window.showErrorMessage("Please provide a valid JSON file");
      }
    }
  );

  context.subscriptions.push(runServer);
  context.subscriptions.push(stopServer);
}

// This method is called when your extension is deactivated
export function deactivate() {}
