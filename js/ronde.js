'use strict'

/*
Uitslagen per ronde van de interne competitie

ronde.html:
- h1 id="ronde"
- h2 id="datum"
- table id="uitslagen"

functions.js:
- schaakVereniging
- seizoen

URL searchParams:
- ronde
- datum
 */

const ronde = document.getElementById("ronde");
const rondeNummer = params.get("ronde");
ronde.innerHTML = "Ronde " + rondeNummer + " interne competitie";
const datum = document.getElementById("datum");
datum.innerHTML = params.get("datum");

const tabel = document.getElementById("uitslagen");
const naarSpeler = url.pathname.replace("ronde.html","speler.html");
uitslagenlijst();
/*
  ronde.js

  -- uitslagen interne competitie per ronde
  select
      uitslag.knsbNummer,
      wit.naam,
      uitslag.tegenstanderNummer,
      zwart.naam,
      uitslag.resultaat
  from uitslag
  join persoon as wit on uitslag.knsbNummer = wit.knsbNummer
  join persoon as zwart on uitslag.tegenstanderNummer = zwart.knsbNummer
  where seizoen = @seizoen and teamCode = 'int' and rondeNummer = @rondeNummer and witZwart = 'w'
  order by uitslag.seizoen, rondeNummer, bordNummer;
   */
function uitslagenlijst() {
    asyncFetch("/ronde/" + seizoen + "/" + rondeNummer,
        (u) => {
            let witSpeler = href(u.wit,`${naarSpeler}?speler=${u.knsbNummer}&naam=${u.wit}`);
            let zwartSpeler = href(u.zwart,`${naarSpeler}?speler=${u.tegenstanderNummer}&naam=${u.zwart}`);
            let resultaat = u.resultaat === "1" ? "1-0" : u.resultaat === "0" ? "0-1" : "½-½";
            tabel.appendChild(rij(witSpeler, zwartSpeler, resultaat));
        });
}
