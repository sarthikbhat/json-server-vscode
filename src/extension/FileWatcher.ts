import { FileSystemWatcher, workspace } from "vscode";
import { Helper } from "../server/utils/helper";
import { Commands } from "./Commands";

export class FileWatcher {
  private static _fileWatcher: FileSystemWatcher;

  private static get fileWatcher() {
    if (!FileWatcher._fileWatcher) {
      FileWatcher._fileWatcher = workspace.createFileSystemWatcher("**/*.json");
    }

    return FileWatcher._fileWatcher;
  }

  public static InitWatcher() {
    const watcher: FileSystemWatcher = this.fileWatcher;
    const commands = new Commands();

    watcher.onDidChange((e) => {
      if (e.toString() === commands.getCurrFile) {
        workspace.openTextDocument(e).then((doc) => {
          Helper.setJSONObject(JSON.parse(doc.getText()));
        });
      }
    });
  }
}
