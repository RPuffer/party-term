"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
/**
 * Defines folder icons
 */
exports.folderIcons = [
    {
        name: 'specific',
        defaultIcon: { name: 'folder' },
        rootFolder: { name: 'folder-root' },
        icons: [
            { name: 'folder-src', folderNames: ['src', 'source', 'sources'] },
            { name: 'folder-dist', folderNames: ['dist', 'out', 'build', 'release'] },
            {
                name: 'folder-css',
                folderNames: ['css', 'stylesheet', 'stylesheets', 'style', 'styles']
            },
            { name: 'folder-sass', folderNames: ['sass', 'scss'] },
            {
                name: 'folder-images',
                folderNames: ['images', 'image', 'img', 'icons', 'icon', 'ico', 'screenshot', 'screenshots']
            },
            { name: 'folder-scripts', folderNames: ['script', 'scripts'] },
            { name: 'folder-node', folderNames: ['node_modules'] },
            { name: 'folder-javascript', folderNames: ['js', 'javascript', 'javascripts'] },
            { name: 'folder-font', folderNames: ['font', 'fonts'] },
            { name: 'folder-bower', folderNames: ['bower_components'] },
            {
                name: 'folder-test',
                folderNames: [
                    'test',
                    'tests',
                    '__tests__',
                    '__snapshots__',
                    '__mocks__',
                    '__test__',
                    'spec',
                    'specs'
                ]
            },
            {
                name: 'folder-jinja',
                folderNames: [
                    'jinja',
                    'jinja2',
                    'j2'
                ],
                light: true
            },
            { name: 'folder-markdown', folderNames: ['markdown', 'md'] },
            { name: 'folder-php', folderNames: ['php'] },
            { name: 'folder-phpmailer', folderNames: ['phpmailer'] },
            { name: 'folder-sublime', folderNames: ['sublime'] },
            { name: 'folder-docs', folderNames: ['doc', 'docs'] },
            {
                name: 'folder-git',
                folderNames: ['.git', 'submodules', '.submodules']
            },
            { name: 'folder-github', folderNames: ['.github'] },
            { name: 'folder-gitlab', folderNames: ['.gitlab'] },
            { name: 'folder-vscode', folderNames: ['.vscode', '.vscode-test'] },
            {
                name: 'folder-views',
                folderNames: ['view', 'views', 'screen', 'screens', 'page', 'pages', 'html']
            },
            { name: 'folder-vue', folderNames: ['vue'] },
            { name: 'folder-expo', folderNames: ['.expo'] },
            { name: 'folder-config', folderNames: ['config'] },
            { name: 'folder-i18n', folderNames: ['i18n', 'lang', 'locale', 'locales', 'localization'] },
            { name: 'folder-components', folderNames: ['components'] },
            { name: 'folder-aurelia', folderNames: ['aurelia_project'] },
            {
                name: 'folder-resource',
                folderNames: ['resource', 'resources', 'res', 'asset', 'assets', 'static']
            },
            { name: 'folder-lib', folderNames: ['lib'] },
            { name: 'folder-tools', folderNames: ['tools'] },
            { name: 'folder-webpack', folderNames: ['webpack'] },
            { name: 'folder-global', folderNames: ['global'] },
            { name: 'folder-public', folderNames: ['public', 'wwwroot'] },
            { name: 'folder-include', folderNames: ['include', 'includes'] },
            { name: 'folder-docker', folderNames: ['docker', '.docker'] },
            { name: 'folder-ngrx-effects', folderNames: ['effects'], enabledFor: [index_1.IconPack.Ngrx] },
            { name: 'folder-ngrx-state', folderNames: ['states', 'state'], enabledFor: [index_1.IconPack.Ngrx] },
            { name: 'folder-ngrx-reducer', folderNames: ['reducers', 'reducer'], enabledFor: [index_1.IconPack.Ngrx] },
            { name: 'folder-ngrx-actions', folderNames: ['actions'], enabledFor: [index_1.IconPack.Ngrx] },
            { name: 'folder-ngrx-entities', folderNames: ['entities'], enabledFor: [index_1.IconPack.Ngrx] },
            { name: 'folder-redux-reducer', folderNames: ['reducers', 'reducer'], enabledFor: [index_1.IconPack.Redux] },
            { name: 'folder-redux-actions', folderNames: ['actions'], enabledFor: [index_1.IconPack.Redux] },
            { name: 'folder-redux-store', folderNames: ['store'], enabledFor: [index_1.IconPack.Redux] },
            { name: 'folder-react-components', folderNames: ['components'], enabledFor: [index_1.IconPack.React, index_1.IconPack.Redux] },
            { name: 'folder-database', folderNames: ['db', 'database', 'sql'] },
            { name: 'folder-log', folderNames: ['log', 'logs'] },
            { name: 'folder-temp', folderNames: ['temp', '.temp', 'tmp', '.tmp', 'cached', 'cache'] },
            { name: 'folder-aws', folderNames: ['aws', '.aws'] },
            { name: 'folder-audio', folderNames: ['audio', 'audios', 'music'] },
            { name: 'folder-video', folderNames: ['video', 'videos', 'movie', 'movies'] },
            { name: 'folder-kubernetes', folderNames: ['kubernetes', 'k8s'] },
            { name: 'folder-import', folderNames: ['import', 'imports', 'imported'] },
            { name: 'folder-export', folderNames: ['export', 'exports', 'exported'] },
            { name: 'folder-wakatime', folderNames: ['wakatime'] },
            { name: 'folder-circleci', folderNames: ['.circleci'] },
            { name: 'folder-wordpress', folderNames: ['wp-content'] },
            { name: 'folder-gradle', folderNames: ['gradle', '.gradle'] },
            { name: 'folder-coverage', folderNames: ['coverage'] },
            { name: 'folder-other', folderNames: ['other', 'others', 'misc', 'miscellaneous'] },
            { name: 'folder-typescript', folderNames: ['typescript', 'ts'] },
        ]
    },
    { name: 'classic', defaultIcon: { name: 'folder' }, rootFolder: { name: 'folder-root' } },
    { name: 'none', defaultIcon: { name: '' } },
];
//# sourceMappingURL=folderIcons.js.map