import { env, Uri, window, workspace } from "vscode";
import { PORT, startServer, stopServerConnections } from "../server/server";
import { StatusBarSetup } from "./StatusBarSetup";
import { ShowMessageDialog } from "./ShowMessageDialog";
import { Helper } from "../server/utils/helper";

export class Commands {
  private _currFile = "";

  public get getCurrFile() {
    return this._currFile;
  }

  public set setCurrFile(currFile: string) {
    this._currFile = currFile;
  }

  public async startServer() {
    if (!workspace.workspaceFolders?.length) {
      ShowMessageDialog.showInfo(
        "Please open a JSON file inside a workspace or folder."
      );
      return;
    }

    // const currTextEditor = window.activeTextEditor;
    const currTextEditor = window?.tabGroups?.activeTabGroup?.activeTab
      ?.input as { uri: Uri };

    // const uri = currTextEditor?.document.uri as Uri;
    const uri = currTextEditor.uri;

    this.setCurrFile = uri.toString();

    console.log(uri.toString());
    if (!uri.toString().includes(".json")) {
      ShowMessageDialog.showInfo("Please open a valid JSON file.");
      return;
    }

    // let currText = ""

    const currText = (await workspace.openTextDocument(uri)).getText();

    try {
      if (currText) {
        const parseJSON = JSON.parse(currText);
        Helper.setJSONObject(parseJSON);
        const portReturn = await startServer();
        StatusBarSetup.GoOnline(portReturn as number);
        ShowMessageDialog.showInfoWithItems(
          `Live Server is now active: ${portReturn}`,
          "Open"
        ).then((selection) => {
          if (selection?.toLowerCase() === "open") {
            env.openExternal(Uri.parse(`http://127.0.0.1:${PORT}`));
          }
        });
      }
    } catch (error) {
      console.log(error);
      ShowMessageDialog.showError("Error in stopping the server!!");
    }
  }

  public stopServer() {
    try {
      StatusBarSetup.PrepareOffline(PORT);
      setTimeout(async () => {
        const close = await stopServerConnections();
        this.setCurrFile = "";
        if (close) {
          StatusBarSetup.Activate();
        } else throw Error("Error");
      }, 1000);
    } catch (error) {
      ShowMessageDialog.showError("Error in stopping the server!!");
    }
  }
}
