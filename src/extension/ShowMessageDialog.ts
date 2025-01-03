import { window } from "vscode";

export class ShowMessageDialog {
  public static showInfo(message: string) {
    window.showInformationMessage(message);
  }

  public static showInfoWithItems(message: string, ...items: string[]) {
    return window.showInformationMessage(message, ...items);
  }

  public static showError(message: string) {
    window.showErrorMessage(message);
  }
}
