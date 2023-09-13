import { willys } from "./webScraping/willys"

const express = require('express')
const router = express.Router()



router.get('/willys', async (req: any, res: any) => {
    try {
        const search = req.query.search;
        console.log(search)
        const willysProducts = await willys(search);
        res.json(willysProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
})

exports.router = router