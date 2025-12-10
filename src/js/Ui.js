/**
 * Ui.js
 * --------------------
 * Modul se stará se o vykreslování HTML prvků a pracuje s DOM. Vykresluje položky našeptávače a výslednou předpověď.
 * Třída: Ui
 * @param input - input element, ze kterého čteme hodnotu
 * @param suggestions - element, do kterého vypisuji návrhy (našeptácač)
 * @param forecast - element pro výpis předpovědi
 * 
 * Metody:
 *  - renderSuggestions(cities)             // dostane seznam měst a každý vloží do bloku našeptávače
 *  - createOrganizedWeatherData(weather)   // vytvoří dictionary kde klíč je datum předpovědi s hodnotami čas a teplota
 *  - renderWeather(weather)                // z dictionary vyrenderuje html prvky s daty o počasí
 *  - getInput()                            // vrátí hodnotu inputu
 *  - setInput(inputValue)                  // nastaví hodnotu inputu (spíše z kosmetických důvodů, aby po geolokaci nebyl input prázdný)
 *  - setCityName(cityName)                 // nastaví název města jako nadpis pro počasí
 * 
 */


export default class Ui {
    constructor(input, suggestions, forecast) {
        this.input = input;
        this.suggestions = suggestions;
        this.forecast = forecast;

        this.cityName = "";


    }

    /**
     * Dostane seznam měst a každý vloží do bloku našeptávače
     * @param cities - seznam měst pro výpis
     */

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


    /**
     * Vytvoří dictionary kde klíč je datum předpovědi s hodnotami čas a teplota
     * @param weather - z dat od OpenWeatherMap vytvoří strukturu pro příjemné generování předpovědi
     * @returns - dictionary kde klíč je datum předpovědi s hodnotami čas a teplota 
     */

    createOrganizedWeatherData(weather) {
        let organizedData = {};

        weather.forEach(data => {
            const raw_date = new Date(data.dt * 1000);

            const date = raw_date.toLocaleDateString(navigator.language);
            const time = raw_date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });

            const temperature = data.main.temp;

            const timeTemp = {"time": time, "temperature": temperature};

            if (organizedData[date]) {
                organizedData[date].push(timeTemp);
            } else {
                organizedData[date] = [timeTemp];
            }

            
        });

        return organizedData;

    }   
    
    /**
     * Z dictionary vyrenderuje html prvky s daty o počasí 
     * @param weather - z dat od OpenWeatherMap vytvoří strukturu pro příjemné generování předpovědi
     */

    renderWeather(weather) {
        if (!this.forecast) {
            console.error("Element pro forecast nenalezen");
            return;
        }

        this.forecast.innerHTML = "";

        // vytvoří pro každé datum (klíč) přidá seznam ve kterém je čas a teplota
        let organizedData = this.createOrganizedWeatherData(weather);
        

        const cityNameHeading = document.createElement("h1");
        cityNameHeading.innerText = this.cityName;
        this.forecast.appendChild(cityNameHeading)


        for (const [key, values] of Object.entries(organizedData)) {
            const wrapperDiv = document.createElement("div");
            wrapperDiv.classList.add("blok");

            const heading = document.createElement("h2");
            heading.innerText = key;
            wrapperDiv.appendChild(heading);

            values.forEach(value => {
                const valueDiv = document.createElement("div");
                valueDiv.classList.add("temperature_block");

                const timeSpan = document.createElement("span");
                timeSpan.innerText = value.time
                timeSpan.classList.add("for_time");
                valueDiv.appendChild(timeSpan);

                const tempSpan = document.createElement("span");
                tempSpan.innerText = value.temperature + " °C";
                tempSpan.classList.add("for_temp");
                valueDiv.appendChild(tempSpan);


                wrapperDiv.appendChild(valueDiv);

            })

            this.forecast.appendChild(wrapperDiv)
        }

        
        

    }


    getInput() {
        if (!this.input) {
            console.error("Input nenalezen");
            return;
        }

        return this.input.value;
    }
    
    /**
     * Nastaví hodnotu inputu (spíše z kosmetických důvodů, aby po geolokaci nebyl input prázdný)
     * @param inputValue - požadovaná hodnota pro input
     */

    setInput(inputValue) {
        if (!this.input) {
            console.error("Input nenalezen");
            return;
        }

        this.input.value = inputValue;
    }

    /**
     * Nastaví název města jako nadpis pro počasí
     * @param cityName - název města pro předpověď
     */

    setCityName(cityName) {
        if (!cityName) {
            console.error("Název nenalezen");
            return;
        }
        this.cityName = cityName;

        return true;
    }
}
