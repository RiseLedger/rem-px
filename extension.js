// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  var disposable = vscode.commands.registerTextEditorCommand('rempx.convert', function (textEditor, textEditorEdit) {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }

    const config = vscode.workspace.getConfiguration('rempx');
    const selection = textEditor.selection;
    const lineText = editor.document.lineAt(selection.start.line).text;
    const text = lineText.slice(selection.start.character, selection.end.character);
    const isPX = text.endsWith('px');
    const isREM = text.endsWith('rem');

    if (isPX) {
      const newText = text.replace(/([0-9\.]+)px/, function (data, value) {
        return `${value / config.get('remEqual')}rem`;
      });
      textEditorEdit.replace(selection, newText);
    }
    else if (isREM) {
      const newText = text.replace(/([0-9\.]+)rem/, function (data, value) {
        return `${value * config.get('remEqual')}px`;
      });
      textEditorEdit.replace(selection, newText);
    }
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;