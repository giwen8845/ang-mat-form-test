# Form minta app

* baloldali hasáb: kitöltendő form, "mentés"-re post a szervernek, frissül a form a szerver oldali validációk üzeneteivel
* jobb felül: aktuális kliens/szerver oldali model
* jobb alul: aktuális szerver oldali validációs üzeneteket lehet megadni/törölni, amik mentésre frissülnek a form-on

## Futtatáshoz szükséges:
* Legújabb stabil node, npm telepítve
* Angular CLI (version 7.3.1. v újabb) telepítve
* git clone https://github.com/giwen8845/ang-mat-form-test.git
* ng serve
* http://localhost:4200/

## Amire minta:

* Angular 7 
* Angular Material komponenskönyvtárral létrehozott form (https://material.angular.io/components/input/overview)
* Angular reactive form pattern https://angular.io/guide/reactive-forms 
* Mock-olt szerver form post -> response alapján adatfrissítés (HttpService)
* Kliens + szerver oldali validációk együttes használata felhasználó számára átlátszó módon
* Közös ős form validációs szervice (BaseFormValidatorService)
* Közös ős http service (BaseFormHttpService)
* Közös ős form komponens (BaseFormComponent)
* Közös ős error state matcher (BaseErrorStateMatcher) a kliens/szerver hibák összefésülésére
* Közös ős formBuilder (BaseFormBuilderService) a form mezők + szerver oldali validáció megfeleltetések elfedésére
* Kiemelt form komponensek (CommonTextInputComponent, ...), a jövőben könnyen átalakítható/lecserélhető a form elemek renderelése

## Amit még lehetne alakítani a mintaalkalmazáson:

* absztrakciók, kiemelések
* ismert hiba: ki nem töltött alkalmazottnévnél nem jelenik a meg a szerver validáció
