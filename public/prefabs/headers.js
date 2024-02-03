const PrefabHeader = (function(){

    const CURRENT_PAGE_CLASS = "current-page-action-item";

    //metody, które będą dostępne publicznie
    return {
        get
    };

    function get(){
        document.write(
            `<header class="mdc-top-app-bar">
                    <div class="mdc-top-app-bar__row" style >
                        <section_header class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                            <a href="" class="mdc-button mdc-top-app-bar__action-item">
                                <header class="mdc-button__ripple"></header>
                                <header class="mdc-button__label">Pomoc</header>
                            </a>
                        </section_header>
                        <section_header class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">`
                            + generateLogginLoggoutFunction()
                        + `</section_header>
                    </div>
                    <div class="mdc-top-app-bar__row">
                        <section_header class="mdc-top-app-bar__section">
                            <hr>
                        </section>
                    </div>
                    <div class="mdc-top-app-bar__row__page">
                        <section_header class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">`
                            + generatePages()
                        + `</section_header>
                        <section_header class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
                            
                        </section_header>
                    </div>
                </header>`);
    }

    function generateLogginLoggoutFunction(){
        if(isThisPageOpen("loggin")) {
            return `<a href="..\\registration" class="mdc-button mdc-top-app-bar__action-item">
                        <header class="mdc-button__ripple"></header>
                        <header class="mdc-button__label">Zarejestruj się</header>
                    </a>`;
        }
        if(User.isLogged()){
            return `<a onclick="User.logOut()" class="mdc-button mdc-top-app-bar__action-item">
                        <header class="mdc-button__ripple"></header>
                        <header class="mdc-button__label">Wyloguj się</header>
                    </a>`;
        } else {
            return `<a href="..\\loggin" class="mdc-button mdc-top-app-bar__action-item">
                        <header class="mdc-button__ripple"></header>
                        <header class="mdc-button__label">Zaloguj się</header>
                    </a>`;
        }
    }

    function generatePages() {
        const userType = User.getTypeOfLoggedUser();
        if (userType == User.WERYFIKATOR) {
            return generatePageElement("Weryfikacje", "verification");
        } else if (userType == User.UZYTKOWNIK_ZALOGOWANY) {
            return generatePageElement("Sklep", "news")
                + generatePageElement("Twoje Gry", "yourGames")
                + generatePageElement("Profil", "profile");
        } else if (userType == User.TWORCA){
            return generatePageElement("Sklep", "news")
                + generatePageElement("Profil", "profile");
        } else {
             return generatePageElement("Sklep", "news");
         }
    }

    function generatePageElement(name, address){
        const currentClass = isThisPageOpen(address) ? CURRENT_PAGE_CLASS : '';
        return `<div class="form">
                    <form action="/auth/${address}" method="POST">
                        <a href="..\\` + address + `" class="mdc-button mdc-top-app-bar__action-item ` + currentClass + `">
                            <header class="mdc-button__ripple"></header>
                            <button class="mdc-button__label">` + name + `</button>
                        </a>
                    </form>
                </div>`;
    }

    function isThisPageOpen(page){
        const splitedUrl = window.location.href.split('/');
        const currentPage = splitedUrl[splitedUrl.length-2];
        return currentPage == page;
    }
})();