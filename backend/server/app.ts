const puppeteer = require("puppeteer")


async function run() {
    const cookie = [
      // {
      //   name:"OptanonConsent",
      //   value:"isGpcEnabled=0&datestamp=Wed+Sep+06+2023+19%3A23%3A32+GMT%2B0200+(Central+European+Summer+Time)&version=202306.2.0&browserGpcFlag=0&isIABGlobal=false&consentId=d53581ba-a41f-4c67-a67a-e3e2c97b9721&interactionCount=0&landingPath=https%3A%2F%2Fwww.willys.se%2Fsortiment%2Fkott-chark-och-fagel&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0&hosts=H25%3A1%2CH99%3A1%2CH5%3A1%2CH8%3A1%2CH3%3A0%2CH26%3A0%2CH11%3A0&genVendors=",
      //   domain:".willys.se",
      //   path:"/",
      //   expires:1725557012,
      //   size:440,
      //   httpOnly:false,
      //   secure:false,
      //   session:false,
      //   sameSite:"Lax",
      //   sameParty:false,
      //   sourceScheme:"Secure",
      //   sourcePort:443
      // },
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
        // sameParty:false,
        // sourceScheme:"Secure",
        // sourcePort:443
    }
    ]
    const browser = await puppeteer.launch( {headless: true} )
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 1024 })

    const url =  'https://www.willys.se/sortiment/kott-chark-och-fagel'

    await page.goto(url, { waitUntil: ['load', 'domcontentloaded']})

    for (let i = 0; i < cookie.length; i++) {
      await page.setCookie(cookie[i]);
    }
    // await page.setCookie(cookie)

    // await page.waitForSelector('[data-testid="product"]');


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
    // await page.click('[data-testid="load-more-btn"]')

    // async function scrollBottomPage() {
    //     let originalOffset = 0;
    //     while (true) {
    //         await page.evaluate('window.scrollBy(0, document.body.scrollHeight)');
    //         await page.waitForTimeout(200);
    //         let newOffset = await page.evaluate('window.pageYOffset');
    //         if (originalOffset === newOffset) {
    //             break;
    //         }
    //         originalOffset = newOffset;
    //     }
    // }

    //     scrollBottomPage()

    //   await page.screenshot({ path: 'example.png'})


    
      // console.log(await page.evaluate(() => document.querySelectorAll('[data-testid="product"]').length))


    //   CONFIRMS THAT IT ACTUALLY IS A BUTTON ELEMENT
      //   const cookieElement = await page.$('#onetrust-reject-all-handler');

      //   if (cookieElement) {
      //     const elementType = await page.evaluate((el: HTMLElement) => {
      //       return el.tagName;
      //     }, cookieElement);
      
      //     console.log(`#onetrust-reject-all-handler exists and is a ${elementType} element`);
      //   } else {
      //     console.log('#onetrust-reject-all-handler does not exist');
      //   } 


      // await page.waitForSelector('#onetrust-accept-btn-handler', { visible: true} );
      // await page.click('#onetrust-accept-btn-handler')

      // await page.waitForSelector('#onetrust-banner-sdk', { visible: true });
      //   await page.addStyleTag({
      //       content: '#onetrust-banner-sdk { display: none !important; }',
      //   });


      // const cookieClass = '#onetrust-accept-btn-handler'
      // // const cookieClass = '#onetrust-reject-all-handler'
      // const cookies = await page.$(cookieClass)
      // if (cookies) {
      //   console.log('cookies exist')
      //   try {
      //     await page.waitForSelector(cookieClass);
      //       await page.click(cookieClass)
      //   }catch(error){
      //       console.error(error)
      //   }
      // } else {
      //   console.log('cookies dont exist')
      // }

      

      // const loadButton = await page.$('[data-testid="load-more-btn"]') 
      // if (loadButton) {
      //   console.log('Button exist')
      //   await page.click('[data-testid="load-more-btn"]')
      //   await page.waitForTimeout(5000);
      //   await page.click('[data-testid="load-more-btn"]')
 
      //   console.log(await page.evaluate(() => document.querySelectorAll('[data-testid="product"]').length))

      // } else {
      //   console.log('Button dont exist')
      // }



            await page.screenshot({ path: 'example.png', fullPage: true})
    // await page.screenshot({ path: 'example.png' })
    let cookieset = await page.cookies(url)
    console.log(JSON.stringify(cookieset))
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