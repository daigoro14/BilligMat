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
function run() {
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
        const search = "chili";
        const url = `https://www.willys.se/sok?q=${search}`;
        yield page.goto(url, { waitUntil: ['load', 'domcontentloaded'] });
        for (let i = 0; i < cookie.length; i++) {
            yield page.setCookie(cookie[i]);
        }
        let cookieset = yield page.cookies(url);
        console.log(JSON.stringify(cookieset));
        // await page.waitForSelector('[data-testid="product"]');
        // await page.click('[data-testid="load-more-btn"]')
        // SCREENSHOT
        // await page.screenshot({ path: 'example.png' })
        // await page.screenshot({ path: 'example.png', fullPage: true })
        // const html = await page.content()
        // console.log(html)
        // const text = await page.evaluate(() => document.body.innerText)
        // console.log(text)
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
        while (loadedProducts !== amountProducts) {
            yield scrollBottomPage();
            // Update the number of loaded products
            loadedProducts = yield page.evaluate(() => document.querySelectorAll('[data-testid="product"]').length);
        }
        console.log(loadedProducts, amountProducts);
        yield page.screenshot({ path: 'example.png', fullPage: true });
        // CONSOLE LOG EVERY PRODUCT
        // const sortiment = await page.evaluate(() =>
        //     Array.from(document.querySelectorAll('[data-testid="product"]'), (e) => ({
        //         title: e.querySelector('.fvLpBT').innerText,
        //         price: e.querySelector('.gIEzQM').innerText
        //     }))
        // )
        // console.log(sortiment)
        const sortiment = yield page.evaluate(() => Array.from(document.querySelectorAll('[data-testid="product"]'), (e) => {
            const titleElement = e.querySelector('.fvLpBT');
            const priceElement = e.querySelector('.gIEzQM');
            // Check if titleElement and priceElement exist before accessing their properties.
            if (titleElement && priceElement) {
                return {
                    title: titleElement.innerText,
                    price: priceElement.innerText,
                };
            }
            else {
                return null; // Handle the case where elements are not found.
            }
        }));
        console.log(sortiment);
        yield browser.close();
    });
}
run();
