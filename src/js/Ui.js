export default class Ui {
    constructor(input, suggestions, forecast) {
        this.input = input;
        this.suggestions = suggestions;
        this.forecast = forecast;


    }


    renderSuggestions(cities) {
        if (!this.suggestions) {
            console.error("Element pro suggestions nenalezen");
            return;
        }

        this.suggestions.innerHTML = "";

        cities.forEach(city => {
            const p = document.createElement("p");
            p.textContent = city.name;
            p.addEventListener("click", () => {
                this.input.value = city.name;
                this.suggestions.innerHTML = "";
            });

            this.suggestions.appendChild(p);
        });
    }

    renderWeather(weather) {
        if (!this.forecast) {
            console.error("Element pro forecast nenalezen");
            return;
        }

        this.forecast.innerHTML = "";

        weather.forEach(data => {
            const time = document.createElement("p");
            const date = new Date(data.dt * 1000);
            time.textContent = date.toLocaleString();

            const temperature = document.createElement("p");
            temperature.textContent = data.main.temp;

            this.suggestions.appendChild(time);
            this.suggestions.appendChild(temperature);

        });
    }


    getInput() {
        if (!this.input) {
            console.error("Input nenalezen");
            return;
        }

        return this.input.value;
    }
}
