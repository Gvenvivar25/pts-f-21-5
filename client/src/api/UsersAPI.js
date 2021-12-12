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
    let UserData = [];
if(window.location.search){
    UserData = decodeURIComponent(location.search.substr(1)).split('&');
    editUserData(UserData);
}
let User = {};
function editUserData(arr){
    console.log(arr)
     if(arr.length===6){
         console.log(arr[4]);
         if(arr[4]){
             console.log(arr[4].lastIndexOf('=', ))
         }
     }
}



//getResponce()
