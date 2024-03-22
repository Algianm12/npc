const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const UserAgents = require('user-agents');
const delay = require('delay');
const TronWeb = require('tronweb');

const fs = require('fs');


(async () => {

    const dataLocalStorage = await fs.readFileSync('gmlikes.txt', 'utf-8').split('\n');

    for (let index = 0; index < dataLocalStorage.length; index++) {
        const element = dataLocalStorage[index];
        console.log(element)
        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            slowMo: 0,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-accelerated-2d-canvas',
                '--no-zygote',
                '--no-first-run',
                '--ignore-certificate-errors',
                '--ignore-certificate-errors-spki-list',
                '--disable-dev-shm-usage',
                '--disable-infobars',
                '--window-size=1920x1080'
            ]
        });
    
        const page = await browser.newPage();

        await page.emulateTimezone("Asia/Jakarta");
        const userAgent = new UserAgents();
        await page.setUserAgent(userAgent.toString());
        await page.setDefaultNavigationTimeout(0);

        await page.goto('https://www.gmlikes.com/#/pages/my/set/address', {
            waitUntil: 'networkidle0',
            timeout: 120000,
        });

        await page.evaluate((element) => {
            localStorage.setItem('user', element);
        }, element);
 
        await page.goto('https://www.gmlikes.com/#/pages/my/set/address', {
            waitUntil: 'networkidle0',
            timeout: 120000,
        });

        const dataWallet = await TronWeb.createAccount();

        //set mnemonic
        await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(1) > div > input");
        await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(1) > div > input", 'a', { delay: 50 });

        await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(2) > div > input");
        await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(2) > div > input", 'b', { delay: 50 });

        await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(3) > div > input");
        await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(3) > div > input", 'c', { delay: 50 });

        await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(4) > div > input");
        await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(4) > div > input", 'd', { delay: 50 });

        await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(2) > uni-view.list-item > uni-input > div > input");
        await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(2) > uni-view.list-item > uni-input > div > input", dataWallet.address.base58, { delay: 50 });

        await page.evaluate(() => document.querySelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.box-submit > uni-button").click());
        await delay(2000)

        await page.goto('https://www.gmlikes.com/#/pages/my/set/cash-pwd', {
            waitUntil: 'networkidle0',
            timeout: 120000,
        });

        await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(1) > div > input");
        await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(1) > div > input", 'a', { delay: 50 });

        await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(2) > div > input");
        await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(2) > div > input", 'b', { delay: 50 });

        await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(3) > div > input");
        await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(3) > div > input", 'c', { delay: 50 });

        await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(4) > div > input");
        await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(1) > uni-view.list-item.flex-center-between > uni-input:nth-child(4) > div > input", 'd', { delay: 50 });

        await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(2) > uni-view.list-item > uni-input > div > input");
        await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.content > uni-view:nth-child(2) > uni-view.list-item > uni-input > div > input", 'Coegsekali1', { delay: 50 });

        await page.evaluate(() => document.querySelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.box-submit > uni-button").click());
        await delay(2000)
        const elementJson = JSON.parse(element);
        elementJson.dataWallet = dataWallet;
        fs.appendFileSync('withWallet.txt', `${JSON.stringify(elementJson)}\n`)

        
        await browser.close();

    }

    


})();