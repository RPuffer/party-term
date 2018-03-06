'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var svgProvider_1 = require("./svgProvider");
var exportProvider_1 = require("./exportProvider");
var exec = require('sync-exec');
var fs = require('pn/fs');
var tmp = require('tmp');
var cp = require('copy-paste');
var svgexport = require('svgexport');
var path = require('path');
var phantomjs = require('phantomjs-prebuilt');
function activate(context) {
    // Check PhantomJS Binary
    if (!fs.existsSync(phantomjs.path)) {
        exec('npm rebuild', { cwd: context.extensionPath });
        process.env.PHANTOMJS_PLATFORM = process.platform;
        process.env.PHANTOMJS_ARCH = process.arch;
        phantomjs.path = process.platform === 'win32' ?
            path.join(path.dirname(phantomjs.path), 'phantomjs.exe') :
            path.join(path.dirname(phantomjs.path), 'phantom', 'bin', 'phantomjs');
    }
    var provider = new svgProvider_1.SvgDocumentContentProvider();
    var registration = vscode.workspace.registerTextDocumentContentProvider('svg-preview', provider);
    var fileUriProviders = new Map();
    vscode.workspace.onDidChangeTextDocument(function (e) {
        if (vscode.window.activeTextEditor) {
            if (e.document === vscode.window.activeTextEditor.document && !checkNoSvg(vscode.window.activeTextEditor.document, false)) {
                provider.update(svgProvider_1.getSvgUri(e.document.uri));
            }
        }
    });
    vscode.window.onDidChangeActiveTextEditor(function (textEditor) {
        if (vscode.window.activeTextEditor) {
            if (textEditor.document === vscode.window.activeTextEditor.document && !checkNoSvg(vscode.window.activeTextEditor.document, false)) {
                provider.update(svgProvider_1.getSvgUri(textEditor.document.uri));
                var auto = vscode.workspace.getConfiguration('svgviewer').get('enableautopreview');
                if (auto && !provider.exist(svgProvider_1.getSvgUri(textEditor.document.uri))) {
                    return openPreview(textEditor.document.uri, textEditor.document.fileName);
                }
            }
        }
    });
    var open = vscode.commands.registerTextEditorCommand('svgviewer.open', function (te, t) {
        if (checkNoSvg(te.document))
            return;
        provider.update(svgProvider_1.getSvgUri(te.document.uri));
        return openPreview(te.document.uri, te.document.fileName);
    });
    context.subscriptions.push(open);
    var openfile = vscode.commands.registerCommand('svgviewer.openfile', function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var document, fName, fileUriProvider, fileUri, fileProvider, fileRegistration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(uri instanceof vscode.Uri)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, vscode.workspace.openTextDocument(uri)];
                    case 1:
                        document = _a.sent();
                        if (checkNoSvg(document, false)) {
                            vscode.window.showWarningMessage("Selected file is not an SVG document - no properties to preview.");
                            return [2 /*return*/];
                        }
                        fName = vscode.workspace.asRelativePath(document.fileName);
                        fileUriProvider = fileUriProviders.get(fName);
                        if (fileUriProvider == undefined) {
                            fileUri = svgProvider_1.getSvgUri(uri);
                            fileProvider = new svgProvider_1.SvgFileContentProvider(fileUri, document.fileName);
                            fileRegistration = vscode.workspace.registerTextDocumentContentProvider('svg-preview', fileProvider);
                            fileUriProvider = { uri: fileUri, provider: fileProvider, registration: fileRegistration };
                            fileUriProviders.set(fName, fileUriProvider);
                        }
                        else {
                            fileUriProvider.provider.update(fileUriProvider.uri);
                        }
                        return [2 /*return*/, openPreview(fileUriProvider.uri, fName)];
                }
            });
        });
    });
    context.subscriptions.push(openfile);
    var saveas = vscode.commands.registerTextEditorCommand('svgviewer.saveas', function (te, t) {
        if (checkNoSvg(te.document))
            return;
        var editor = vscode.window.activeTextEditor;
        if (editor) {
            var text = editor.document.getText();
            var tmpobj = tmp.fileSync({ 'postfix': '.svg' });
            var pngpath = editor.document.uri.fsPath.replace('.svg', '.png');
            exportPng(tmpobj, text, pngpath);
        }
    });
    context.subscriptions.push(saveas);
    var saveassize = vscode.commands.registerTextEditorCommand('svgviewer.saveassize', function (te, t) {
        if (checkNoSvg(te.document))
            return;
        var editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        var text = editor.document.getText();
        var tmpobj = tmp.fileSync({ 'postfix': '.svg' });
        var pngpath = editor.document.uri.fsPath.replace('.svg', '.png');
        creatInputBox('width')
            .then(function (width) {
            if (width) {
                creatInputBox('height')
                    .then(function (height) {
                    if (height) {
                        exportPng(tmpobj, text, pngpath, Number(width), Number(height));
                    }
                });
            }
        });
    });
    context.subscriptions.push(saveassize);
    var copydu = vscode.commands.registerTextEditorCommand('svgviewer.copydui', function (te, t) {
        if (checkNoSvg(te.document))
            return;
        var editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        var text = editor.document.getText();
        cp.copy('data:image/svg+xml,' + encodeURIComponent(text));
    });
    context.subscriptions.push(copydu);
    var exportProvider = new exportProvider_1.ExportDocumentContentProvider(context);
    vscode.workspace.registerTextDocumentContentProvider('svg-export', exportProvider);
    var makeExportUri = function (uri) { return uri.with({
        scheme: 'svg-export',
        path: uri.path + '.rendered',
        query: uri.toString()
    }); };
    vscode.workspace.onDidChangeTextDocument(function (event) {
        if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
            exportProvider.update(makeExportUri(event.document.uri));
        }
    });
    var openexport = vscode.commands.registerCommand('svgviewer.openexport', function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(uri instanceof vscode.Uri)) {
                            if (vscode.window.activeTextEditor) {
                                uri = vscode.window.activeTextEditor.document.uri;
                            }
                            else {
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, vscode.workspace.openTextDocument(uri)];
                    case 1:
                        document = _a.sent();
                        if (checkNoSvg(document)) {
                            vscode.window.showWarningMessage("Active editor doesn't show a SVG document - no properties to preview.");
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, vscode.commands.executeCommand('vscode.previewHtml', makeExportUri(uri))];
                }
            });
        });
    });
    context.subscriptions.push(openexport);
    var savedu = vscode.commands.registerCommand('svgviewer.savedu', function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = new Buffer(args.du.split(',')[1], 'base64');
                fs.writeFileSync(args.output, data);
                vscode.window.showInformationMessage('export done. ' + args.output);
                return [2 /*return*/];
            });
        });
    });
    context.subscriptions.push(savedu);
}
exports.activate = activate;
function creatInputBox(param) {
    return vscode.window.showInputBox({
        prompt: "Set " + param + " of the png.",
        placeHolder: "" + param,
        validateInput: checkSizeInput
    });
}
function checkNoSvg(document, displayMessage) {
    if (displayMessage === void 0) { displayMessage = true; }
    var isNGType = document.languageId !== 'xml' && document.getText().indexOf('</svg>') < 0;
    if (isNGType && displayMessage) {
        vscode.window.showWarningMessage("Active editor doesn't show a SVG document - no properties to preview.");
    }
    return isNGType;
}
function checkSizeInput(value) {
    return value !== '' && !isNaN(Number(value)) && Number(value) > 0
        ? null : 'Please set number.';
}
function exportPng(tmpobj, text, pngpath, w, h) {
    console.log("export width:" + w + " height:" + h);
    var result = fs.writeFile(tmpobj.name, text, 'utf-8')
        .then(function (x) {
        svgexport.render({
            'input': tmpobj.name,
            'output': pngpath + " pad " + (w || '') + (w == null && h == null ? '' : ':') + (h || '')
        }, function (err) {
            if (!err)
                vscode.window.showInformationMessage('export done. ' + pngpath);
            else
                vscode.window.showErrorMessage(err);
        });
    })
        .catch(function (e) { return vscode.window.showErrorMessage(e.message); });
}
function openPreview(previewUri, fileName) {
    var viewColumn;
    switch (vscode.workspace.getConfiguration('svgviewer').get('previewcolumn')) {
        case "One":
            viewColumn = 1;
            break;
        case "Two":
            viewColumn = 2;
            break;
        case "Three":
            viewColumn = 3;
            break;
        default:
            viewColumn = 0;
            break;
    }
    if (viewColumn) {
        return vscode.commands.executeCommand('vscode.previewHtml', svgProvider_1.getSvgUri(previewUri), viewColumn, "Preview : " + fileName)
            .then(function (s) { return console.log('done.'); }, vscode.window.showErrorMessage);
    }
}
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map