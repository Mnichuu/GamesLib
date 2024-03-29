const User = (function(){

    const UZYTKOWNIK_ZALOGOWANY = "USER";
    const UZYTKOWNIK_NIEZALOGOWANY = "UNZ";
    const SOCIAL_MANAGER = "ADMIN";
    const TWORCA = "CREATOR";
    const WERYFIKATOR = "VERIFIER";

    const COOKIE_NAME = "userId";
    const COOKIE2_NAME = "userType";
    const COOKIE3_NAME = "userName";
    const COOKIE4_NAME = "userNick";

    //metody, które będą dostępne publicznie
    return {
        UZYTKOWNIK_ZALOGOWANY,
        UZYTKOWNIK_NIEZALOGOWANY,
        SOCIAL_MANAGER,
        TWORCA,
        WERYFIKATOR,
        isLogged,
        getTypeOfLoggedUser,
        getUserId,
        tryLoggin,
        logOut,
        getUserType,
        getUserName,
        getUserNick
    };

    //zwraca czy jest ktoś zalogowany
    function isLogged(){
        if(getUserIdFromCookies() == '')
            return false;
        return true;
    }

    //zwraca jaki typ użytkonika jest zalodowyany
    // patrzy linie 3-7;
    function getTypeOfLoggedUser(){
        const type = getUserTypeFromCookies();
        switch(type){
            case "1":
                return SOCIAL_MANAGER;
            case "2":
                return TWORCA;
            case "3":
                return UZYTKOWNIK_ZALOGOWANY;
            case "4":
                return WERYFIKATOR;
            default:
                return UZYTKOWNIK_NIEZALOGOWANY;
        }
    }

    //zwraca id uzytkownika, na jego podstawie będą wyciągane dane z bazy
    //przed użyciem sprawdzić czy ktoś jest zalogowany [isLogged()]
    function getUserId(){
        return getUserIdFromCookies();
    }

    function getUserType(){
        return getUserTypeFromCookies();
    }

    function getUserName(){
        return getUserNameFromCookies();
    }

    function getUserNick(){
        return getUserNickFromCookies();
    }

    function tryLoggin(email, password) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM user_credentials WHERE login = ? AND password = ?';
            const connection = require('./connection');

            // Use the executeQuery function from connection.js to execute the query
            connection.executeQuery(sql, [email, password])
                .then(result => {
                    resolve(result.length > 0);
                })
                .catch(err => {
                    console.error('Error executing login MySQL query:', err);
                    reject(err);
                });
        });
    }


    function logOut(){
        createUserIdCookie("", "", -30);
        window.open("../..", "_self");
    }

    /* metody prywatne */

    function getUserIdFromCookies(){
        return document.cookie.match('(^|;)\\s*' + COOKIE_NAME + '\\s*=\\s*([^;]+)')?.pop() || '';
    }

    function getUserTypeFromCookies(){
        return document.cookie.match('(^|;)\\s*' + COOKIE2_NAME + '\\s*=\\s*([^;]+)')?.pop() || '';
    }

    function decodeCookieValue(cookieValue) {
        return decodeURIComponent(cookieValue.replace(/\+/g, ' '));
    }

    function getUserNameFromCookies(){
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(COOKIE3_NAME) === 0) {
                return decodeCookieValue(cookie.substring(COOKIE3_NAME.length + 1, cookie.length));
            }
        }
        return '';
    }

    function getUserNickFromCookies() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(COOKIE4_NAME) === 0) {
                return decodeCookieValue(cookie.substring(COOKIE4_NAME.length + 1, cookie.length));
            }
        }
        return '';
    }

    function createUserIdCookie(id, userType, minutes){
      const d = new Date();
      d.setTime(d.getTime() + (minutes*60*1000));    //ustawiamy, "automatyczne wylogowanie" po minutach
      document.cookie = COOKIE_NAME + "=" + id + ";"
                + "expires="+ d.toUTCString() +"; path=/";
      document.cookie = COOKIE2_NAME + "=" + userType + ";"
                + "expires="+ d.toUTCString() +"; path=/";
    }

})();