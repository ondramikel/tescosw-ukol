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
        this.geo;


    
    }

    async init() {
        await this.search.loadJson();

        this.input = document.getElementById("input_field");
        this.suggestions = document.getElementById("suggestions");
        this.forecast = document.getElementById("forecast");
        this.chose = document.getElementById("chose");
        this.geo = document.getElementById("geolocate");


        this.ui = new Ui(this.input, this.suggestions, this.forecast);



        if(!this.input) return false;
    
        this.eventOnInput();
        
        if(!this.geo) return false;

        this.byGeolocate()

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


    byGeolocate() {
        this.geo.addEventListener("click",(e) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    

                    let geoData = {
                        "coord": {
                            "lon": position.coords.longitude,
                            "lat": position.coords.latitude
                        }
                    }

                    console.log("Lat:", geoData.coord.lat);
                    console.log("Lon:", geoData.coord.lon);


                    this.weatherData.getForecast(geoData).then(data => {
                        console.log(data);
                        console.log(data.city.name);
                        this.ui.setCityName(data.city.name);

                        this.ui.renderWeather(data.list);
                    });
                },
                (error) => {
                    console.error("Chyba geolokace:", error);
                }
            );
        })
    }

    eventOnChose() {
        this.chose.addEventListener("click",(e) => {
            let input_data = this.ui.getInput();
            let find_data = this.search.cityExists(input_data);

            if (find_data) {
                this.weatherData.getForecast(find_data).then(data => {
                    console.log(data);
                    this.ui.setCityName(input_data);
                    this.ui.renderWeather(data.list);
                });
            }
        })
    }
}