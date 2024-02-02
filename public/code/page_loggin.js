const PageLoggin = (function(){

    //metody, które będą dostępne publicznie
    return {
        loggin
    };

    async function loggin(){
        const inputs = document.getElementsByTagName("input");
        const email = inputs[0].value;
        const password = inputs[1].value;
        
        try {
            const correctPass = await User.tryLoggin(email, password);

            if(correctPass) {
                window.open("../..", "_self");
            } else {
                alert("Uwaga!\nNiepoprawne dane logowania!");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Wystąpił błąd podczas logowania.");
        }
    }
})();