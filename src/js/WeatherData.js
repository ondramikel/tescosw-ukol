/**
 * WeatherData.js
 * --------------------
 * Modul zajišťuje komunikaci s API OpenWeatherMap a získává předpovědi počasí.
 * Třída: WeatherData
 * Metody:
 *  - getForecast(city) // získá předpověď pro zadané město
 *
 */



export default class WeatherData {
    constructor() {
        // !!! Pozor: API klíč je zde pouze pro účely tohoto úkolu.
        // V produkční aplikaci by měl být chráněn a dostupný jen přes backend.
        this.apiKey = "14095ed384f72adb429b55fdd17c57bf";
        this.baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
    }


    /**
     * Získá předpověď počasí pro zadané město.
     * @param city - Objekt města ze souboru city.list.json.
     * @returns - Promise, která vrátí JSON s předpovědí.
     */

    async getForecast(city) {
        const lat = city.coord.lat;
        const lon = city.coord.lon;
        const units = "metric";
        const lang = "cs";

        const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${this.apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Chyba při získávání dat");
        }

        const data = await response.json();
        return data;
    }
}
