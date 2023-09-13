"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteer = require("puppeteer");
function coop() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer.launch({ headless: true });
        const page = yield browser.newPage();
        yield page.setViewport({ width: 1280, height: 1024 });
        const search = "potatis";
        const url = `https://www.coop.se/handla/sok/?q=${search}&page=1`;
        yield page.goto(url, { waitUntil: ['load', 'domcontentloaded'], timeout: 60000 });
        console.log('hello');
        yield browser.close();
    });
}
// export {coop}
