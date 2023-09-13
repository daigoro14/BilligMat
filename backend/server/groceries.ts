import { willys } from "./webScraping/willys"
import { coop } from './webScraping/coop'

const express = require('express')
const router = express.Router()

router.get('/coop', async (req: any, res: any) => {
    coop()
    res.send('success')
})


router.post('/searchGrocery', async (req: any, res: any) => {
    try {
        console.log(req.body.search, req.body.select)
        const search = req.body.search;
        const select = req.body.select;
        const groceries: any = []
        if (select.includes('willys')) {
            const willysProducts = await willys(search);
            await willysProducts.results.map((item: any) => {
                groceries.push(item)
            })
            console.log(groceries)
        }
        res.json(groceries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
})


exports.router = router