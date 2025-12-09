export default class CitySearch {
    constructor(json) {
        this.json = json;
        this.cities = [];
    }

    async loadJson() {
        const response = await fetch(this.json);
        this.cities = await response.json();
    }

    find(prefix) {
        if (!prefix) return [];
        const lowerPrefix = prefix.toLowerCase();
        return this.cities.filter(city => city.name.toLowerCase().startsWith(lowerPrefix));
    }
}
