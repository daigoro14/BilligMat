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
Object.defineProperty(exports, "__esModule", { value: true });
exports.willys = void 0;
const puppeteer = require("puppeteer");
function willys(search) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookie = [
            {
                name: "OptanonAlertBoxClosed",
                value: "2023-09-06T21:14:57.783Z",
                domain: ".willys.se",
                path: "/",
                expires: 1725557012,
                size: 45,
                httpOnly: false,
                secure: false,
                session: false,
                sameSite: "Lax",
            }
        ];
        const browser = yield puppeteer.launch({ headless: true });
        const page = yield browser.newPage();
        yield page.setViewport({ width: 1280, height: 1024 });
        // const search = "chili"
        const url = `https://www.willys.se/sok?q=${search}`;
        yield page.goto(url, { waitUntil: ['load', 'domcontentloaded'], timeout: 60000 });
        for (let i = 0; i < cookie.length; i++) {
            yield page.setCookie(cookie[i]);
        }
        // let cookieset = await page.cookies(url)
        // console.log(JSON.stringify(cookieset))
        function scrollBottomPage() {
            return __awaiter(this, void 0, void 0, function* () {
                let originalOffset = 0;
                while (true) {
                    yield page.evaluate('window.scrollBy(0, document.body.scrollHeight)');
                    yield page.waitForTimeout(200);
                    let newOffset = yield page.evaluate('window.pageYOffset');
                    if (originalOffset === newOffset) {
                        break;
                    }
                    originalOffset = newOffset;
                }
            });
        }
        // AMOUNT OF PRODUCTS EXISTING ON THE PAGE
        const amountProducts = yield page.evaluate(() => {
            const amountString = document.querySelector('[data-testid="search-result-total-amount"]');
            if (amountString) {
                const text = amountString.innerText;
                const numericPart = text.match(/\d+/); // Extract numeric part using a regular expression.
                if (numericPart) {
                    return parseInt(numericPart[0]);
                }
            }
            return null; // Return null for invalid or missing data.
        });
        let loadedProducts = 0;
        // Keep scrolling until the number of loaded products matches the total number of products
        while (loadedProducts < amountProducts) {
            console.log("stuck in the loop", loadedProducts, amountProducts);
            yield scrollBottomPage();
            // Update the number of loaded products
            loadedProducts = yield page.evaluate(() => document.querySelectorAll('[data-testid="product"]').length);
        }
        console.log(loadedProducts, amountProducts);
        yield page.screenshot({ path: 'example.png', fullPage: true });
        // GET PRODUCTS
        const sortiment = yield page.evaluate(() => Array.from(document.querySelectorAll('[data-testid="product"]'), (e) => {
            const title = e.querySelector('.sc-dfc0c17a-6');
            const info = e.querySelector('.gIAiTA');
            const image = e.querySelector('.dvcXsc img');
            const unit = e.querySelector('.eKiAfO');
            const comparePrice = e.querySelector('.fEiMEI');
            // REGULAR PRODUCTS
            if (e.querySelector('.fOeffH')) {
                const priceInt = e.querySelector('.fVzqtS');
                const priceDec = e.querySelector('.czApoH');
                return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ store: "willys" }, (title && { title: title.innerText })), (info && { info: info.innerText })), (image && { image: image.getAttribute('src') })), (priceInt && priceDec && { price: parseInt(priceInt.innerText) + (0.01 * parseInt(priceDec.innerText)) })), (unit && { unit: unit.innerText })), (comparePrice && { comparePrice: comparePrice.innerText }));
                // SPECIAL OFFER, MULTIPLE FOR BETTER PRICE EXAMPLE 2 FOR 1
            }
            else if (e.querySelector('.bIIDrS') && e.querySelector('.kDhKOX')) {
                const message = e.querySelector('.kDhKOX');
                const regularPrice = e.querySelector('.bNSKGy');
                const specialPriceInt = e.querySelector('.fVzqtS');
                const specialPriceDec = e.querySelector('.czApoH');
                const match = regularPrice === null || regularPrice === void 0 ? void 0 : regularPrice.innerText.match(/(\d+(?:,\d+)?)\s(.+)/);
                let price = 0;
                let unit = "";
                if (match) {
                    price = parseFloat(match[1].replace(',', '.'));
                    unit = match[2];
                }
                return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ store: "willys" }, (title && { title: title.innerText })), (info && { info: info.innerText })), (image && { image: image.getAttribute('src') })), (price && { price: price })), (unit && { unit: unit })), (message && { message: `${message.innerText} ${specialPriceInt === null || specialPriceInt === void 0 ? void 0 : specialPriceInt.innerText}.${specialPriceDec === null || specialPriceDec === void 0 ? void 0 : specialPriceDec.innerText}` })), (comparePrice && { comparePrice: comparePrice.innerText }));
                // SPECIAL PRICE
            }
            else if (e.querySelector('.bIIDrS')) {
                const priceInt = e.querySelector('.fVzqtS');
                const priceDec = e.querySelector('.czApoH');
                return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ store: "willys" }, (title && { title: title.innerText })), (info && { info: info.innerText })), (image && { image: image.getAttribute('src') })), (priceInt && priceDec && { price: parseInt(priceInt.innerText) + (0.01 * parseInt(priceDec.innerText)) })), (unit && { unit: unit.innerText })), (comparePrice && { comparePrice: comparePrice.innerText }));
            }
            else if (e.querySelector('.EVWID')) {
                const priceInt = e.querySelector('.fVzqtS');
                const priceDec = e.querySelector('.czApoH');
                const premium = e.querySelector('.iXIReR');
                const regularPrice = e.querySelector('.bNSKGy');
                const match = regularPrice === null || regularPrice === void 0 ? void 0 : regularPrice.innerText.match(/(\d+(?:,\d+)?)\s(.+)/);
                let price = 0;
                let regularPriceUnit = "";
                if (match) {
                    price = parseFloat(match[1].replace(',', '.'));
                    regularPriceUnit = match[2];
                }
                return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ store: "willys" }, (title && { title: title.innerText })), (info && { info: info.innerText })), (image && { image: image.getAttribute('src') })), (price && { price: price })), (priceInt && priceDec && { specialPrice: parseInt(priceInt.innerText) + (0.01 * parseInt(priceDec.innerText)) })), (unit && { specialPriceUnit: unit.innerText })), (regularPriceUnit && { unit: regularPriceUnit })), (premium && { premium: "Willys Plus" })), (comparePrice && { comparePrice: comparePrice.innerText }));
            }
        }));
        // Sometimes willys website will add related products which we dont want, this will only get the relevant products
        const results = sortiment.slice(0, amountProducts);
        yield browser.close();
        return {
            results
        };
    });
}
exports.willys = willys;
