/**
 * main.js
 * --------------------
 * Startovací soubor aplikace pro předpověď počasí.
 * Vytváří objekt hlavní třídy WeatherApp a inicializuje ho.
 * 
 */


import WeatherApp from './WeatherApp.js';


const app = new WeatherApp();
if (!await app.init()) {
    console.error("Chyba inicializace");
}
