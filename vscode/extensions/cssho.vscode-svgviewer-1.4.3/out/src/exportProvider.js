'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var path = require("path");
var ExportDocumentContentProvider = (function () {
    function ExportDocumentContentProvider(_context) {
        this._context = _context;
        this._onDidChange = new vscode.EventEmitter();
    }
    ExportDocumentContentProvider.prototype.provideTextDocumentContent = function (uri) {
        var _this = this;
        var docUri = vscode.Uri.parse(uri.query);
        return vscode.workspace.openTextDocument(docUri).then(function (document) { return _this.snippet(document); });
    };
    Object.defineProperty(ExportDocumentContentProvider.prototype, "onDidChange", {
        get: function () {
            return this._onDidChange.event;
        },
        enumerable: true,
        configurable: true
    });
    ExportDocumentContentProvider.prototype.update = function (uri) {
        this._onDidChange.fire(uri);
    };
    ExportDocumentContentProvider.prototype.getPath = function (p) {
        return path.join(this._context.extensionPath, p);
    };
    ExportDocumentContentProvider.prototype.snippet = function (document) {
        var showTransGrid = vscode.workspace.getConfiguration('svgviewer').get('transparencygrid');
        var css = "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + this.getPath('media/export.css') + "\">";
        var jquery = "<script src=\"" + this.getPath('node_modules/jquery/dist/jquery.js') + "\"></script>";
        var exportjs = "<script src=\"" + this.getPath('media/export.js') + "\"></script>";
        var output = document.uri.fsPath.replace('.svg', '.png');
        var exportButton = "<a id=\"export\" data-output=\"" + encodeURIComponent(output) + "\" href=\"#\" class=\"button\">Export PNG</a>";
        var canvas = "<canvas id=\"canvas\" class=\"svgbg\" data-showtransgrid=\"" + showTransGrid + "\"></canvas>";
        var svg = document.getText();
        var image = "<img id=\"image\" src=\"" + ('data:image/svg+xml,' + encodeURIComponent(document.getText())) + "\" alt=\"svg image\" />";
        var width = "<div class=\"wrapper\"><label for=\"width\" class=\"label-name\">Width</label><input id=\"width\" type=\"number\" placeholder=\"width\"><label for=\"width\"> px</label></div>";
        var height = "<div class=\"wrapper\"><label for=\"height\" class=\"label-name\">Height</label><input id=\"height\" type=\"number\" placeholder=\"height\"><label for=\"height\"> px</label></div>";
        var options = "<h1>Options</h1><div class=\"form\">" + width + height + exportButton + "</div>";
        return "<!DOCTYPE html><html><head>" + css + jquery + exportjs + "</head><body>" + options + "<h1>Preview</h1><div>" + svg + image + canvas + "</div></body></html>";
    };
    return ExportDocumentContentProvider;
}());
exports.ExportDocumentContentProvider = ExportDocumentContentProvider;
//# sourceMappingURL=exportProvider.js.map