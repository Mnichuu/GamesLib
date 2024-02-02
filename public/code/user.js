const User = (function(){

    const UZYTKOWNIK_ZALOGOWANY = "UZ";
    const UZYTKOWNIK_NIEZALOGOWANY = "UNZ";
    const SOCIAL_MANAGER = "SM";
    const TWORCA = "T";
    const WERYFIKATOR = "W";

    const COOKIE_NAME = "userId";
    const COOKIE2_NAME = "userType";

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
        logOut
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
                return UZYTKOWNIK_ZALOGOWANY;
            case "2":
                return TWORCA;
            case "3":
                return SOCIAL_MANAGER;
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

    //zwraca true lub fałsz w zależności czy udało się zalogować
    function tryLoggin(email, password){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM user_credentials WHERE login = ? AND password = ?';
            const connection = require('./connection');
            
            connection.query (sql, [email, password], (err, result) => {
                if(err) {
                    console.error('Error executing login MySQL query:', err);
                    return reject(err);
                }

                const users = result;
                resolve(users.length > 0);
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

    function createUserIdCookie(id, userType, minutes){
      const d = new Date();
      d.setTime(d.getTime() + (minutes*60*1000));    //ustawiamy, "automatyczne wylogowanie" po minutach
      document.cookie = COOKIE_NAME + "=" + id + ";"
                + "expires="+ d.toUTCString() +"; path=/";
      document.cookie = COOKIE2_NAME + "=" + userType + ";"
                + "expires="+ d.toUTCString() +"; path=/";
    }

})();