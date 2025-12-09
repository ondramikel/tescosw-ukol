export default class WeatherData {
    constructor() {
        this.apiKey = "14095ed384f72adb429b55fdd17c57bf";  
        this.baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
    }

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
