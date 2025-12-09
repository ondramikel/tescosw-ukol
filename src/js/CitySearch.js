export default class CitySearch {
    constructor(json) {
        this.json = json;
        this.maxSuggestions = 10;
        this.cities = [];
    }

    async loadJson() {
        const response = await fetch(this.json);
        this.cities = await response.json();
    }

    find(prefix) {
        if (!prefix || prefix.length <= 1) return [];
        const lowerPrefix = prefix.toLowerCase();

        const filtered = this.cities.filter(city => city.name.toLowerCase().includes(lowerPrefix));

        // seřadím podle podobnosti v začátku
        const sorted = filtered.sort((a, b) => {
            const aLower = a.name.toLowerCase();
            const bLower = b.name.toLowerCase();

            // kyž najdu přesný match tak jde hned nahoru
            if (aLower === lowerPrefix) return -1;
            if (bLower === lowerPrefix) return 1;

            // když zacíná na lowerPrefix tak jde jako první
            if (aLower.startsWith(lowerPrefix) && !bLower.startsWith(lowerPrefix)) return -1;
            if (!aLower.startsWith(lowerPrefix) && bLower.startsWith(lowerPrefix)) return 1;

            // jinak neřeší
            return 0;
        });




        return sorted.slice(0, this.maxSuggestions);
    }

    cityExists(name) {
        if (!name) return false;
        const lowerName = name.toLowerCase();
        return this.cities.find(city => city.name.toLowerCase() === lowerName);

    }
}
