const PageMain = (function(){

    //metody, które będą dostępne publicznie
    return {
        openDefaultPage
    };

    function openDefaultPage(){
        const userType = User.getTypeOfLoggedUser();
        if(userType == User.WERYFIKATOR) {
            window.open("../views/verification/", "_self");
        } else {
            window.open("../views/news/", "_self");
        }
    }

})();

PageMain.openDefaultPage();
