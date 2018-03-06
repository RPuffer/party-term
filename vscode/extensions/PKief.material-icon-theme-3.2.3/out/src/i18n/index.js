"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
// Get current language of the vs code workspace
exports.getCurrentLanguage = () => vscode.env.language;
let currentTranslation;
let fallbackTranslation; // default: en
const PLACEHOLDER = '%';
/** Initialize the translations */
exports.initTranslations = () => __awaiter(this, void 0, void 0, function* () {
    try {
        currentTranslation = yield loadTranslation(exports.getCurrentLanguage());
        fallbackTranslation = yield loadTranslation('en');
    }
    catch (error) {
        console.log(error);
    }
});
/** Load the required translation */
const loadTranslation = (language) => {
    return getTranslationObject(language)
        .catch(() => getTranslationObject('en'));
};
/** Get the translation object of the separated translation files */
const getTranslationObject = (language) => __awaiter(this, void 0, void 0, function* () {
    try {
        // tslint:disable-next-line:semicolon
        const lang = yield Promise.resolve().then(() => require('./lang-' + language));
        return lang.translation;
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * We look up the matching translation in the translation files.
 * If we cannot find a matching key in the file we use the fallback.
 * With optional parameters you can configure both the translations
 * and the fallback (required for testing purposes).
 * */
exports.getTranslationValue = (key, translations = currentTranslation, fallback = fallbackTranslation) => {
    return exports.getValue(translations, key) ?
        exports.getValue(translations, key) :
        exports.getValue(fallback, key) ?
            exports.getValue(fallback, key) : undefined;
};
/**
 * The instant method is required for the translate pipe.
 * It helps to translate a word instantly.
 */
exports.translate = (key, words) => {
    const translation = exports.getTranslationValue(key);
    if (!words)
        return translation;
    return exports.replace(translation, words);
};
/**
 * The replace function will replace the current placeholder with the
 * data parameter from the translation. You can give it one or more optional
 * parameters ('words').
 */
exports.replace = (value = '', words) => {
    let translation = value;
    const values = [].concat(words);
    values.forEach((e, i) => {
        translation = translation.replace(PLACEHOLDER.concat(i), e);
    });
    return translation;
};
/** Get the nested keys of an object (http://stackoverflow.com/a/6491621/6942210)
 *
 * *This solution is lighter than the lodash get-version and works fine for the translations.* */
exports.getValue = (obj, key) => {
    // convert indexes to properties
    key = key.replace(/\[(\w+)\]/g, '.$1');
    // strip a leading dot
    key = key.replace(/^\./, '');
    // separate keys in array
    let keyArray = key.split('.');
    /** Avoid errors in the getValue function. */
    const isObject = (object) => {
        return object === Object(object);
    };
    for (let i = 0; i < keyArray.length; ++i) {
        let k = keyArray[i];
        if (isObject(obj) && k in obj) {
            obj = obj[k];
        }
        else {
            return;
        }
    }
    return obj;
};
//# sourceMappingURL=index.js.map