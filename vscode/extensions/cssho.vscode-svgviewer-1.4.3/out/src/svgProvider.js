'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var fs = require("fs");
function getSvgUri(uri) {
    if (uri.scheme === 'svg-preview') {
        return uri;
    }
    return uri.with({
        scheme: 'svg-preview',
        path: uri.path + '.rendered',
        query: uri.toString()
    });
}
exports.getSvgUri = getSvgUri;
var SvgDocumentContentProvider = (function () {
    function SvgDocumentContentProvider() {
        this._onDidChange = new vscode.EventEmitter();
        this._waiting = false;
    }
    SvgDocumentContentProvider.prototype.provideTextDocumentContent = function (uri) {
        var _this = this;
        var sourceUri = vscode.Uri.parse(uri.query);
        console.log(sourceUri);
        return vscode.workspace.openTextDocument(sourceUri).then(function (document) { return _this.snippet(document.getText()); });
    };
    Object.defineProperty(SvgDocumentContentProvider.prototype, "onDidChange", {
        get: function () {
            return this._onDidChange.event;
        },
        enumerable: true,
        configurable: true
    });
    SvgDocumentContentProvider.prototype.exist = function (uri) {
        return vscode.workspace.textDocuments
            .find(function (x) { return x.uri.path === uri.path && x.uri.scheme === uri.scheme; }) !== undefined;
    };
    SvgDocumentContentProvider.prototype.update = function (uri) {
        var _this = this;
        if (!this._waiting) {
            this._waiting = true;
            setTimeout(function () {
                _this._waiting = false;
                _this._onDidChange.fire(uri);
            }, 300);
        }
    };
    SvgDocumentContentProvider.prototype.snippet = function (properties) {
        var showTransGrid = vscode.workspace.getConfiguration('svgviewer').get('transparencygrid');
        var transparencycolor = vscode.workspace.getConfiguration('svgviewer').get('transparencycolor');
        var transparencyGridCss = '';
        if (showTransGrid) {
            if (transparencycolor != null && transparencycolor !== "") {
                transparencyGridCss = "\n<style type=\"text/css\">\n.svgbg img {\n    background: " + transparencycolor + ";\n}\n</style>";
            }
            else {
                transparencyGridCss = "\n<style type=\"text/css\">\n.svgbg img {\n    background:initial;\n    background-image: url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAeUlEQVRYR+3XMQ4AIQhEUTiU9+/hUGy9Wk2G8luDIS8EMWdmYvF09+JtEUmBpieCJiA96AIiiKAswEsik10JCCIoCrAsiGBPOIK2YFWt/knOOW5Nv/ykQNMTQRMwEERQFWAOqmJ3PIIIigIMahHs3ahZt0xCetAEjA99oc8dGNmnIAAAAABJRU5ErkJggg==);\n    background-position: left,top;\n}\n</style>";
            }
        }
        return "<!DOCTYPE html><html><head>" + transparencyGridCss + "</head><body><div class=\"svgbg\"><img src=\"data:image/svg+xml," + encodeURIComponent(properties) + "\"></div></body></html>";
    };
    return SvgDocumentContentProvider;
}());
exports.SvgDocumentContentProvider = SvgDocumentContentProvider;
var SvgFileContentProvider = (function (_super) {
    __extends(SvgFileContentProvider, _super);
    function SvgFileContentProvider(previewUri, filename) {
        var _this = _super.call(this) || this;
        _this.filename = filename;
        vscode.workspace.createFileSystemWatcher(_this.filename, true, false, true).onDidChange(function (e) {
            _this.update(previewUri);
        });
        return _this;
    }
    SvgFileContentProvider.prototype.extractSnippet = function () {
        var fileText = fs.readFileSync(this.filename, 'utf8');
        var text = fileText ? fileText : '';
        return _super.prototype.snippet.call(this, text);
    };
    return SvgFileContentProvider;
}(SvgDocumentContentProvider));
exports.SvgFileContentProvider = SvgFileContentProvider;
//# sourceMappingURL=svgProvider.js.map