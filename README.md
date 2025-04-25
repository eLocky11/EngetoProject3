# Engeto Academy – Projekt 3: Astro-Weather on Earth

Jednostránková webová aplikace, která kombinuje HTML, CSS a JavaScript a využívá NASA Open API (APOD & DONKI). Uživatelé mohou prohlížet „Photo of the Day“, sledovat geomagnetické bouře, přepínat mezi světlým a tmavým motivem, zadat a ověřit hesla ve formuláři a pohodlně se vracet na začátek stránky.

---

## Funkce projektu

1. **Jednostránkový web** se sekcemi:
   - **About** – stručný popis stránky a použitých API  
   - **Login** – formulář se dvojím zadáním hesla a kontrolou shody  
   - **Photos of the Day** – 3 fotografie (Dnes, Včera, Náhodný den), při najetí myší se plynule zvětšují, při kliknutí se tevře v novém okně
   - **Geo-storms Info** – informace o aktuálních geomagnetických bouřích  
   - **Contacts** – odkazy na GitHub, LinkedIn, Reddit  
2. **Přepínání motivu** (light/dark) jediným tlačítkem, změna třídy na `<body>` a stylování přes CSS hierarchii  
3. **Responzivní hlavička** s burger menu (min. 3 odkazy) pro mobilní i desktopové zobrazení  
4. **Formulář** pro zadání hesel s validací pomocí `addEventListener`  
5. **Back to Top** tlačítko, které se objeví po scrollu dolů a vrací uživatele na začátek stránky  
6. **Responzivní design** pomocí media queries  
7. **Čistý JavaScript** bez inline atributů (`onClick`), všechny události přes `element.addEventListener`  
8. **Estetika** – jemné stíny, zaoblené rohy, plynulé animace a přechody  

---

## Struktura projektu

<pre>
.vscode/                    # Konfigurace vývojového prostředí (bylo použito pro výjimky rozšíření Spell Checker)
src/                        # Zdrojové soubory
  ├── img/                  # Složka s obrázky
  ├── query.css             # Media queries (CSS)
  ├── script.js             # JavaScript kód
  └── style.css             # Hlavní CSS styly
index.html                  # Hlavní HTML soubor
README.md                   # Dokumentace k projektu
</pre>

## Jak spustit

1. Naklonujte repozitář nebo stáhněte složky.  
2. Otevřete `index.html` ve webovém prohlížeči.  
3. **Doporučeno** spustit lokální server (např. Live Server ve VS Code) pro správné načtení CSS/JS.

---

## Použité technologie

- **HTML5** – základní struktura  
- **CSS3** – Flexbox, Grid, přechody, media queries  
- **JavaScript (ES6+)** – `fetch()` pro volání NASA API, DOM manipulace, `addEventListener`  
- **NASA Open APIs** – APOD (Astronomy Picture of the Day), DONKI (Geomagnetic Storms)  
- **Font Awesome** – ikony pro menu a tlačítka  

---

## Autor

**Pavel Karlin**  
- Email: [locky481@gmail.com](mailto:locky481@gmail.com)  
- GitHub: [eLocky11](https://github.com/eLocky11)  
- Discord (ENGETO): eLocky11

---

V případě dotazů mě neváhejte kontaktovat. Užijte si prohlížení a přepínání mezi dnem a nocí! 😊  
