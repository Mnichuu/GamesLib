# Shteam
This repo contains project for WWW course.

# Plan

Myślę, że warto zostawić 4 aktorów:

-Użytkownik niezalogowany (Wyświetlana tylko strona nowości)

-Użytkownik zalogowany (Wyświetlane nowości, biblioteka, profil)

-Twórca (Nowości, Tworzenie/dodawanie gier, profil)

-Weryfikator (Weryfikacja)

# TODO

1. Połączenie obecnego projektu z node.js i express.js (trzeba to rozkminić, żeby dalej pracować). Wywalenie tego php mówiąc w skrócie. DONE
2. Zrobienie logiki do komunikacji klienta z serwerem callback. DONE
3. Dodanie strony "Tworzenie/dodawanie gier" dla twórcy. DONE
4. Dodanie możliwości dodawania do 'Biblioteki gier' gier z nowości. DONE
5. Dodanie jakichś opisów może do tych gier w bibliotece. DONE
6. Dodanie rejestracji (jak nam się będzie chciało). DONE 
7. Zapobieganie dodaniu dwóch gier o takich samych nazwach jako twórca!
8. Ujednolicenie bazy danych dla wszystkich.
9. Profil
10. CSS News i yourGames (game-block) DONE
11. Po naciśnięciu dodaj gre do biblioteki w sklepie przycisk musi się momentalnie zmienić DONE
12. Wyświetlanie nazwy i klasy użytkownika obok przycisku WYLOGUJ SIĘ
13. Rozwijany opis/zawijanie tekstu dla opisów (?)


# Jak widzę ten projekt?

Jak jesteś nie zalogowany to masz wgląd tylko do nowości i nic nie możesz dalej z tym robić.
Możesz się zarejestrować i po rejestracji do bazy danych node.js wpisują się twoje login i hasło.
Po zalogowaniu mamy dostępne 3 zakładki, 'nowości', 'biblioteka gier', 'profil'. Z nowości możemy dodać grę do biblioteki.
Na profilu zostawiłbym takie statystyki jakie są i możliwość zmiany opisu oraz nickname.
Przy zalogowaniu się jako twórca (bardziej byłbym skłonny nazwać to stanowisko ADMIN), możemy dodać nową grę którą będzie akceptował weryfikator.
Po zaakceptowaniu gry przez weryfikatora ląduje do NOWOŚCI.
Myślę, że to ma logiczne działanie, ponieważ załużmy, że jakieś nowe gry wychodzą, więc admin je dodaje. Ktoś inny kto jest weryfikatorem sprawdza czy taka gra np już nie istnieje albo coś.
I wtedy dopiero zwykli użytkownicy mogą dodawać gry do biblioteki, może będą mogli zaznaczać progres w danej grze? Może to przybierze troche rodzaj takiej aplikacji do śledzenia postępów  wgrach i pokazywania w ile gier się gra rocznie?
Jest taka aplikacja do seriali, że się podaje seriale które się oglądało i oblicza czas jaki się przed ekranem spędziło. to mogłoby być dobre.
W każdym razie i tak musimy najpierw zająć się node.js i express.js, oglądnąć jakieś filmiki o tym, czy coś.
żebyśmy oboje wiedzieli jak z tego korzystać i jak to działa.

# Rzeczy zrobione

1. Logowanie
2. Rejestracja
3. Hashowanie
4. Cookies użytkowników
