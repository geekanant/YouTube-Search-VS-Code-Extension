// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const provider = new YouTubeSearchView(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      YouTubeSearchView.viewType,
      provider
    )
  );
}

class YouTubeSearchView implements vscode.WebviewViewProvider {
  public static readonly viewType = "youtube.youtubeSearch";
  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.css")
    );

    return `<!DOCTYPE html>
			<html lang="en">

			<head>
				<meta charset="UTF-8">
				<meta img-src ${webview.cspSource} https:;  style-src ${webview.cspSource};"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleMainUri}" rel="stylesheet">
				<title>YouTube Search</title>
			</head>

			<body>
      			<input id="input-text">
				</input>
				<a>
					<button onclick="ChangeHref()" id="youtube-search" >Search on YouTube</button>
				</a>
					<script>
						function ChangeHref(){
							var link = document.querySelector("a");
							var input = document.getElementById("input-text");

							link.getAttribute("href");
							link.setAttribute("href",
							"https://www.youtube.com/results?search_query=" + encodeURIComponent(input.value));
						}
					</script>
				</body>
			</html>`;
  }
}
