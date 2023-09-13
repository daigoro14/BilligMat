const puppeteer = require("puppeteer")

async function coop() {

    const cookie = [
        {
          name:"__cmpcccu14118",
          value:"aBPyFjAcgAwAzADYBUAAIABwAFwAXABoADkAHgAfgBQAFIALgAggBeAEOA4YBxID1QIMgQcAigBMsCpwJLAUaAGiQREg7KsEqwhXrCvdGkuRowkUJSGzziH4cRXWoBIA",
          domain:".coop.se",
          path:"/",
          expires:1731523520,
          size:142,
          httpOnly:false,
          secure:true,
        //   session:false,
          sameSite: "None",
      },
      {
        name:"__cmpconsent14118",
        value:"BPyFg-IPyFg-IAfKFBSVABAAAAA_mAkAADAAoADAAKgAXAAyAB4AEAAJAATgAqABaADIAGgAPYAiACKAEcAJIATAAngBRgCoAKoAWQAwgCAAFEAPMAhABLQCkAF1APUAfoBGoCQQGMgP5A",
        domain:".coop.se",
        path:"/",
        expires:1731523520,
        size:159,
        httpOnly:false,
        secure:true,
      //   session:false,
        sameSite: "None",
    }
      ]
    const browser = await puppeteer.launch( {headless: true} )
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 1024 })

    const search = "potatis"
    const url = `https://www.coop.se/handla/sok/?q=${search}&page=1`


    await page.goto(url, { waitUntil: ['load', 'domcontentloaded'], timeout: 60000})

    for (let i = 0; i < cookie.length; i++) {
        await page.setCookie(cookie[i]);
    }
    let cookieSet = await page.cookies(url)
    console.log(JSON.stringify(cookieSet))

    console.log('coop page')
    await page.waitForTimeout(5000);

    await page.screenshot({ path: 'coop.png', fullPage: true})



    await browser.close()


}

export {coop}