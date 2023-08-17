const puppeteer = require("puppeteer")

async function run() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.willys.se/sortiment/kott-chark-och-fagel')


    // await page.click('[data-testid="load-more-btn"]')

    // SCREENSHOT
    // await page.screenshot({ path: 'example.png' })
    // await page.screenshot({ path: 'example.png', fullPage: true })



    // const html = await page.content()

    // console.log(html)

    // const text = await page.evaluate(() => document.body.innerText)

    // console.log(text)



    // const puppeteer = require('puppeteer');

    // (async () => {
    //   const browser = await puppeteer.launch();
    //   const page = await browser.newPage();
      
    //   await page.goto('URL_OF_PAGE_TO_SCROLL');
      
    //   // Replace 'CONTAINER_SELECTOR' with the CSS selector of the container element
    //   const containerSelector = 'CONTAINER_SELECTOR';
      
    //   // Find the last child element within the container
    //   const lastChildSelector = `${containerSelector} :last-child`;
    //   const lastChildElement = await page.$(lastChildSelector);
      
    //   if (lastChildElement) {
    //     // Scroll to the last child element
    //     await page.evaluate(element => {
    //       element.scrollIntoView();
    //     }, lastChildElement);
    //   } else {
    //     console.log('Last child element not found.');
    //   }
    
    //   await browser.close();
    // })();



    // const lastElement = await page.evaluate(() => document.querySelectorAll('[data-testid="product"]:last-child'))
    // console.log(lastElement)


    // ****

    // IT DID SCROLL BUT NOT ALL THE WAY 
    // const containerSelector = '[data-testid="product"]'
    // await page.waitForSelector(containerSelector);

    // const lastChildSelector = `${containerSelector} :last-child`;
    // const lastChildElement = await page.$(lastChildSelector);
    //     const lastChildElement = await page.$('[data-testid="load-more-btn"]')


    // if (lastChildElement) {
    //     // Scroll to the last child element
    //     await page.evaluate(element => {
    //       element.scrollIntoView();
    //     }, lastChildElement);
    //   } else {
    //     console.log('Last child element not found.');
    //   }

    //   await page.screenshot({ path: 'example.png', fullPage: true})



    // ****

    // SCROLL TO BOTTOM, WORKS
    await page.click('[data-testid="load-more-btn"]')


    let originalOffset = 0;
    while (true) {
        await page.evaluate('window.scrollBy(0, document.body.scrollHeight)');
        await page.waitForTimeout(200);
        let newOffset = await page.evaluate('window.pageYOffset');
        if (originalOffset === newOffset) {
            break;
        }
        originalOffset = newOffset;
    }


      await page.screenshot({ path: 'example.png'})
      console.log(await page.evaluate(() => document.querySelectorAll('[data-testid="product"]').length))

      

      const cookies = await page.$('#onetrust-reject-all-handler')
      if (cookies) {
        console.log('cookies exist')
        await page.click('#onetrust-reject-all-handler')

      } else {
        console.log('cookies dont exist')
      }

      const loadButton = await page.$('[data-testid="load-more-btn"]')
      if (loadButton) {
        console.log('Button exist')
        await page.click('[data-testid="load-more-btn"]')
        await page.waitForTimeout(5000);
        await page.click('[data-testid="load-more-btn"]')
 
        console.log(await page.evaluate(() => document.querySelectorAll('[data-testid="product"]').length))

      } else {
        console.log('Button dont exist')
      }


            await page.screenshot({ path: 'example.png', fullPage: true})


    // ****

    // CONSOLE LOG EVERY PRODUCT
    // const sortiment = await page.evaluate(() => 
    //     Array.from(document.querySelectorAll('[data-testid="product"]'), (e) => ({
    //         title: e.querySelector('.fvLpBT').innerText,
    //         price: e.querySelector('.gIEzQM').innerText
    //     }))
    // )

    // console.log(sortiment)

    await browser.close()
}

run()