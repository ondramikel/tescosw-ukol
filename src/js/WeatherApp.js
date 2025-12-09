import WeatherData from "./WeatherData.js";
import CitySearch from './CitySearch.js';
import Ui from './Ui.js';


export default class WeatherApp {
    constructor() {
        this.weatherData = new WeatherData();
        this.search = new CitySearch('../../data/city.list.json');
        this.ui;

        this.input;
        this.suggestions;
        this.forecast;
        this.chose;

    
    }

    async init() {
        await this.search.loadJson();

        this.input = document.getElementById("input_field");
        this.suggestions = document.getElementById("suggestions");
        this.forecast = document.getElementById("forecast");
        this.chose = document.getElementById("chose");

        this.ui = new Ui(this.input, this.suggestions, this.forecast);


        
        if(!this.input) return false;
    
        this.eventOnInput();
        

        if(!this.chose) return false;

        this.eventOnChose();
        

    }

    eventOnInput() {
        this.input.addEventListener("input", (e) => {
            let nalezene = this.search.find(this.ui.getInput());
            console.log(nalezene); 
            this.ui.renderSuggestions(nalezene);
        })
    }

    eventOnChose() {
        this.chose.addEventListener("click",(e) => {
            let input_data = this.ui.getInput();
            let find_data = this.search.cityExists(input_data);

            if (find_data) {
                this.weatherData.getForecast(find_data).then(data => {
                    console.log(data);
                    this.ui.renderWeather(data.list);
                });
            }
        })
    }
}