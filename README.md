# Aplikace pro předpověď počasí

## Popis aplikace
Jedná se o jednoduchou webovou aplikaci pro předpověď počasí. Uživatel zadá název města, nebo využije geolokaci, aby se mu zobrazila předpověď. Aplikace zobrazuje předpověď počasí pro následujících 5 dní s rozestupem 3 hodin.

---

## Spuštění aplikace
Projekt se spouští přes lokální server (např. VSCode Live Preview, nebo VSCode Live Server), aby fungovaly všechny moduly, načítání JSON, obrázky a další zdroje. Otevření `index.html` přímo z disku (file://) nemusí fungovat kvůli bezpečnostním omezením prohlížeče.



---

## Podporované prohlížeče
Aplikace je optimalizovaná pro moderní prohlížeče, které podporují ES6 moduly a standardní HTML5/CSS3 vlastnosti:  
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

> Starší verze Internet Explorer nejsou podporovány.

---

## Vnitřní struktura
Projekt je napsaný objektově a je rozdělený do několika modulů.
- každý modul je reprezentován třídou s jasně definovanými metodami a vlastnostmi.


- **`WeatherData.js`** – zajišťuje komunikaci s API OpenWeatherMap a získává předpovědi počasí.
- **`CitySearch.js`** – načítá seznam měst z JSON souboru a zajišťuje vyhledávání, našeptávání a kontroluje existenci zadaného názvu města.
- **`Ui.js`** – stará se o vykreslování HTML prvků a pracuje s DOM. Vykresluje položky našeptávače a výslednou předpověď.
- **`WeatherApp.js`** – hlavní třída, která spojuje všechny moduly a inicializuje aplikaci.
- **`main.js`** – hlavní soubor, který je vložený jako modul do HTML, vytváří objekt z třídy WeatherApp a inicializuje jej.
- **`styles.scss`** – hlavní SCSS soubor pro styly aplikace. Musí se překládat do CSS.

---

## Funkce aplikace
- Našeptávač měst při psaní do vstupního pole.
- Výběr města pomocí geolokace.
- Zobrazení předpovědi pro následujících 5 dnů s 3hodinovým intervalem.
- Čas a datum se formátují podle jazyka a nastavení prohlížeče uživatele.
- Stylování aplikace je řízeno SCSS souborem, který se musí překládat do CSS.
- Plně responzivní a přizpůsobuje se velikosti obrazovky.


## Poznámky
- Pro účely tohoto úkolu je API klíč uložen přímo v kódu, což není bezpečné. V produkční aplikaci by měl být klíč chráněn a přístupný pouze přes backend.
- Pro překlad scss do css byl použit VSC extension **Live Sass Compiler** ve verzi 6.1.4

