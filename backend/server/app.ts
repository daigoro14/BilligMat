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


    await page.goto(url, { waitUntil: ['load', 'domcontentloaded'], timeout: 60000})

    console.log('page loaded')


    for (let i = 0; i < cookie.length; i++) {
      await page.setCookie(cookie[i]);
    }

    // let cookieset = await page.cookies(url)
    // console.log(JSON.stringify(cookieset))

  
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
        while (loadedProducts < amountProducts) {
          console.log("stuck in the loop", loadedProducts, amountProducts)
          await scrollBottomPage();
          
          // Update the number of loaded products
          loadedProducts = await page.evaluate(() =>
            document.querySelectorAll('[data-testid="product"]').length
          );
        }

        console.log(loadedProducts, amountProducts)






      await page.screenshot({ path: 'example.png', fullPage: true})


    // GET PRODUCTS
    const sortiment = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[data-testid="product"]'), (e) => {

          const title = e.querySelector<HTMLDivElement>('.sc-dfc0c17a-6');
          const info = e.querySelector<HTMLSpanElement>('.gIAiTA');
          const image = e.querySelector<HTMLImageElement>('.dvcXsc img');
          

          // REGULAR PRODUCTS
          if (e.querySelector<HTMLDivElement>('.fOeffH')){
            const priceInt = e.querySelector<HTMLSpanElement>('.fVzqtS');
            const priceDec = e.querySelector<HTMLSpanElement>('.czApoH');
            return {
              ...(title && { title: title.innerText }),
              ...(info && { info: info.innerText }),
              ...(image && { image: image.getAttribute('src')}),
              ...(priceInt && priceDec && { price: parseInt(priceInt.innerText) + (0.01 * parseInt(priceDec.innerText)) })
            };

          // SPECIAL OFFER, MULTIPLE FOR BETTER PRICE EXAMPLE 2 FOR 1
          } else if (e.querySelector<HTMLDivElement>('.bIIDrS') && e.querySelector<HTMLDivElement>('.kDhKOX')) {
            const message = e.querySelector<HTMLDivElement>('.kDhKOX')
            const regularPrice = e.querySelector<HTMLSpanElement>('.bNSKGy');
            const specialPriceInt = e.querySelector<HTMLSpanElement>('.fVzqtS');
            const specialPriceDec = e.querySelector<HTMLSpanElement>('.czApoH');

            const match = regularPrice?.innerText.match(/\d+,\d+/);
            let price = 0
            if(match) {
              price = parseFloat(match[0].replace(',', '.'));
            }

            return {
              ...(title && { title: title.innerText }),
              ...(info && { info: info.innerText }),
              ...(image && { image: image.getAttribute('src')}),
              ...(price && { price: price }),
              ...(message && { message: `${message.innerText} ${specialPriceInt?.innerText}.${specialPriceDec?.innerText}` }),
              // ...(specialPriceInt && specialPriceDec && { specialPrice:  })
            };
          
          // SPECIAL PRICE
          } else if (e.querySelector<HTMLDivElement>('.bIIDrS')) {
            const priceInt = e.querySelector<HTMLSpanElement>('.fVzqtS');
            const priceDec = e.querySelector<HTMLSpanElement>('.czApoH');
            return {
              ...(title && { title: title.innerText }),
              ...(info && { info: info.innerText }),
              ...(image && { image: image.getAttribute('src')}),
              ...(priceInt && priceDec && { price: parseInt(priceInt.innerText) + (0.01 * parseInt(priceDec.innerText)) })
            };
          }
      })


    )
    

    // Sometimes willys website will add related products which we dont want, this will only get the relevant products
    const relevantSortiment = sortiment.slice(0, amountProducts)

    console.log(relevantSortiment, amountProducts)

    await browser.close()
}

run()