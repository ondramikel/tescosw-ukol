/**
 * CitySearch.js
 * --------------------
 * Modul načítá seznam měst z JSON souboru a zajišťuje vyhledávání, našeptávání a kontroluje existenci zadaného názvu města.
 * Třída: CitySearch
 * @param json - cesta k json souboru
 * 
 * Metody:
 *  - loadJson()        // načte json soubor
 *  - find(prefix)      // najde všechny města odpovídající zadané časti a seřadí je podle podobnosti s prefixem
 *  - cityExists(name)  // zjistí jestli zadané město existuje v jsonu
 * 
 */


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

    /**
     * Najde všechny města odpovídající zadané časti a seřadí je podle podobnosti s prefixem
     * @param prefix - String který má obsahovat hledané město
     * @returns vrací seřazený seznam měst zkrácený na délku z proměné this.maxSuggestions
     */

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

    /**
     * Zjistí jestli zadané město existuje v jsonu
     * @param name - String který má obsahovat hledané město
     * @returns v případě že najde, vrací objekt městaz JSONu
     */

    cityExists(name) {
        if (!name) return false;
        const lowerName = name.toLowerCase();
        return this.cities.find(city => city.name.toLowerCase() === lowerName);

    }
}
