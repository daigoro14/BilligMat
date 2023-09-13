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
const willys_1 = require("./webScraping/willys");
const express = require('express');
const router = express.Router();
router.post('/searchGrocery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.search, req.body.select);
        const search = req.body.search;
        const select = req.body.select;
        const groceries = [];
        if (select.includes('willys')) {
            const willysProducts = yield (0, willys_1.willys)(search);
            yield willysProducts.results.map((item) => {
                groceries.push(item);
            });
            console.log(groceries);
        }
        res.json(groceries);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
exports.router = router;
