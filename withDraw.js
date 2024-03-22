const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const UserAgents = require('user-agents');
const delay = require('delay');
const CronJob = require('cron').CronJob;
const async = require('async');

const fs = require('fs');


(async () => {

    const dataLocalStorage = await fs.readFileSync('gmlikes .txt', 'utf-8').split('\n');

    async.each(dataLocalStorage, async (element, callback) => {
        try {
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
            await page.setRequestInterception(true);

            page.on('request', request => request.continue())
            page.on('response', async response => {
                // console.log(response.request().resourceType())
                if (response.request().url().includes('/cash/save')) {
                    console.log(await response.json())
                }
            })


            await page.goto('https://www.gmlikes.com/#/pages/my/withdrawal/index', {
                waitUntil: 'networkidle0',
                timeout: 120000,
            });

            await page.evaluate((element) => {
                localStorage.setItem('user', element);
            }, element);


            await page.goto('https://www.gmlikes.com/#/pages/my/withdrawal/index', {
                waitUntil: 'networkidle0',
                timeout: 120000,
            });

            //set mnemonic
            await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.withdrawal-box > uni-view.input > uni-input > div > input");
            await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.withdrawal-box > uni-view.input > uni-input > div > input", '1', { delay: 100 });

            await page.evaluate(() => document.querySelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.box-submit > uni-button").click());

            await page.waitForSelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.popup.notice_up.show > uni-view > uni-view.nav.flex-center > uni-view > uni-input > div > input");
            await page.type("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.popup.notice_up.show > uni-view > uni-view.nav.flex-center > uni-view > uni-input > div > input", 'Coegsekali1', { delay: 100 });
            let running = true;
            const job = new CronJob('* * * * * *', async function () {
                console.log('every second')
                await page.evaluate(() => document.querySelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.popup.notice_up.show > uni-view > uni-view.submit").click());
                running = false;
            }, null, true, 'Asia/Jakarta');
            
            job.start();
        
            
            await delay(2000)


            // await browser.close();


        } catch (e) {
            console.log(chalk.red(`ada masalah ${e}`))
        }
    }, (err) => {
        if (err) {
            console.log(chalk.red(`ada masalah.`))
        }
        console.log('Sukses')
    });




})();