console.log('usersApi')
let btn_login = document.querySelector('.login');
btn_login.addEventListener('click', LoginOpenID);

function LoginOpenID() {
    let urlSite = window.location.origin;
    console.log(urlSite)
    let url = `https://api.worldoftanks.ru/wot/auth/login/?application_id=c4a80daf163b5d68b2d8bd7801d040d0&redirect_uri=${urlSite}`;
    console.log(url)
    window.location.replace(url);
}


function getObjItUrl(){
    console.log('чота есть!');
}

async function getResponce() {
    let response = await fetch('https://api.worldoftanks.ru/wot/auth/login/?application_id=c4a80daf163b5d68b2d8bd7801d040d0&', {
        method: 'GET',
    });
    let content = await response.text();
    let res = JSON.parse(content)
    console.log(res)
}

//getResponce()