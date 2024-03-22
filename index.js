const fetch = require('node-fetch');
const ProxyAgent = require('https-proxy-agent');

const fs = require('fs');

const randstr = (length) =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const randName = (length) =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });


const cookieHelpers = (arrayCookie) => {
    let newCookie = '';
    for (let index = 0; index < arrayCookie.length; index++) {
        const element = arrayCookie[index];
        if (index < arrayCookie.length - 1) {
            newCookie += element.split(';')[0] + '; ';
        } else {
            newCookie += element.split(';')[0];
        }

    }
    return newCookie
};



const generateIndoName = () =>
    new Promise((resolve, reject) => {
        fetch("https://swappery.site/data.php?qty=1", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });



const register = (payload) => new Promise((resolve, reject) => {
    const proxyAgent = new ProxyAgent('http://amin4udin:Coegsekali1@91.239.130.17:12323')
    fetch('https://enapi.gmlikes.com/login/regist', {
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            'sec-ch-ua-mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
            'sec-ch-ua-platform': '"macOS"',
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'Origin': 'https://www.gmlikes.com',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://www.gmlikes.com/',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        body: payload
    })
        .then(async res => {
            const result = {
                body: await res.json()

            };

            resolve(result)

        })
        .catch(err => {
            reject(err)
        })
});

const setWallet = (userId, sign) => new Promise((resolve, reject) => {
    const proxyAgent = new ProxyAgent('http://amin4udin:Coegsekali1@91.239.130.17:12323')
    fetch('https://enapi.gmlikes.com/user/saveUstd', {
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            'sec-ch-ua-mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
            'sec-ch-ua-platform': '"macOS"',
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'Origin': 'https://www.gmlikes.com',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://www.gmlikes.com/',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        body: `link=TT9Na8TDuPw5zdExKkUpeFGj9BmbzWKJhu&word=a%2Cb%2Cc%2Cd&timestamp=${Date.now()}&user=${userId}&sign=${sign}`,
        // agent: proxyAgent
    })
        .then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});


(async () => {
    for (let index = 0; index < 100; index++) {
        const sign = await randName(32);
        const indoName = await generateIndoName();
        const { result } = indoName;
        const name = result[0].firstname.toLowerCase() + result[0].lastname.toLowerCase();
    
        const payload = `username=${name}%40ikimaru.com&word=a%2Cb%2Cc%2Cd&sc=ejv9GvqD&prop=1&password=Coegsekali1&confirm=Coegsekali1&timestamp=${Date.now()}&user=0&sign=${sign}`;
        const registResult = await register(payload);
        console.log(registResult)
        if (registResult.body.code === 0) {
            console.log('sukses regist');
            const dataLocalStorage = {"type":"object","data":registResult.body.data};
            await fs.appendFileSync('gmlikes.txt', `${JSON.stringify(dataLocalStorage)}\n`);
    
    
        } else {
            console.log('gagal regist')
        }
        
    }



})();