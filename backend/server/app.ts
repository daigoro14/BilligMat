const puppeteer = require("puppeteer")


async function run() {
    const cookie = [
      {
        name:"OptanonAlertBoxClosed",
        value:"2023-09-06T21:14:57.783Z",
        domain:".willys.se",
        path:"/",
        expires:1725557012,
        size:45,
        httpOnly:false,
        secure:false,
        session:false,
        sameSite:"Lax",
    }
    ]
    const browser = await puppeteer.launch( {headless: true} )
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 1024 })

    const search = "chili"
    const url = `https://www.willys.se/sok?q=${search}`


    await page.goto(url, { waitUntil: ['load', 'domcontentloaded']})

    for (let i = 0; i < cookie.length; i++) {
      await page.setCookie(cookie[i]);
    }

    let cookieset = await page.cookies(url)
    console.log(JSON.stringify(cookieset))

    // await page.waitForSelector('[data-testid="product"]');


    // await page.click('[data-testid="load-more-btn"]')

    // SCREENSHOT
    // await page.screenshot({ path: 'example.png' })
    // await page.screenshot({ path: 'example.png', fullPage: true })



    // const html = await page.content()

    // console.log(html)

    // const text = await page.evaluate(() => document.body.innerText)

    // console.log(text)






  
    async function scrollBottomPage() {
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
    }

        // AMOUNT OF PRODUCTS EXISTING ON THE PAGE
        const amountProducts = await page.evaluate(() => {
          const amountString: any = document.querySelector('[data-testid="search-result-total-amount"]');
          if (amountString) {
            const text = amountString.innerText;
            const numericPart = text.match(/\d+/); // Extract numeric part using a regular expression.
            if(numericPart) {
              return parseInt(numericPart[0]); 
            }
          } 
          return null; // Return null for invalid or missing data.
        });
        
        let loadedProducts = 0

        // Keep scrolling until the number of loaded products matches the total number of products
        while (loadedProducts !== amountProducts) {
          await scrollBottomPage();
          
          // Update the number of loaded products
          loadedProducts = await page.evaluate(() =>
            document.querySelectorAll('[data-testid="product"]').length
          );
        }

        console.log(loadedProducts, amountProducts)






      await page.screenshot({ path: 'example.png', fullPage: true})


    // CONSOLE LOG EVERY PRODUCT
    // const sortiment = await page.evaluate(() =>
    //     Array.from(document.querySelectorAll('[data-testid="product"]'), (e) => ({
    //         title: e.querySelector('.fvLpBT').innerText,
    //         price: e.querySelector('.gIEzQM').innerText
    //     }))
    // )

    // console.log(sortiment)

    const sortiment = await page.evaluate(() =>
  Array.from(document.querySelectorAll('[data-testid="product"]'), (e) => {
    const titleElement = e.querySelector('.fvLpBT') as HTMLElement | null;
    const priceElement = e.querySelector('.gIEzQM') as HTMLElement | null;

    // Check if titleElement and priceElement exist before accessing their properties.
    if (titleElement && priceElement) {
      return {
        title: titleElement.innerText,
        price: priceElement.innerText,
      };
    } else {
      return null; // Handle the case where elements are not found.
    }
  })
);

console.log(sortiment);

    await browser.close()
}

run()