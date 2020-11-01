'use strict'

/*
Uitslagen en kalender per speler

speler.html:
- h1 id="naam"
- table id="uitslagen"

functions.js:
- schaakVereniging
- seizoen

URL searchParams:
- speler
- naam
 */

const naam = document.getElementById("naam");
naam.innerHTML = params.get("naam");
const speler = params.get('speler'); // knsbNummer

const tabel = document.getElementById("uitslagen");
const naarSpeler = url.pathname;
const naarRonde = naarSpeler.replace("speler.html","ronde.html");
const naarTeam = naarSpeler.replace("speler.html","team.html");
console.log("naarSpeler: " + naarSpeler);
console.log("naarRonde: " + naarRonde);
console.log("naarTeam: " + naarTeam);
uitslagenlijst();

/*
 Fetch JSON uitslagen en verwerk die met uitslagRij tot rijen voor de uitslagen tabel.
 */

function uitslagenlijst() {
    let totaal = 300;
    asyncFetch("/uitslagen/" + seizoen + "/" + speler,
        (uitslag) => {
            totaal = totaal + uitslag.punten;
            tabel.appendChild(uitslagRij(uitslag, totaal));
        });
}

/*
Verwerk een JSON uitslag tot een rij van 8 kolommen.

  -- punten van alle uitslagen per speler
  select u.datum,
      u.rondeNummer,
      u.bordNummer,
      u.witZwart,
      u.tegenstanderNummer,
      p.naam,
      u.resultaat,
      u.teamCode,
      r.compleet,
      r.uithuis,
      r.tegenstander,
      punten(@seizoen, @knsbNummer, u.teamCode, u.tegenstanderNummer, u.resultaat) as punten
  from uitslag u
  join persoon p on u.tegenstanderNummer = p.knsbNummer
  join ronde r on u.seizoen = r.seizoen and u.teamCode = r.teamCode and u.rondeNummer = r.rondeNummer
  where u.seizoen = @seizoen
      and u.knsbNummer = @knsbNummer
      and u.anderTeam = 'int'
  order by u.datum, u.bordNummer;

1. link naar interne ronde
2. datum
3. link naar interne tegenstander, link naar externe wedstrijd of andere tekst
4. externe bord
5. kleur
6. resultaat
7. punten
8. voortschrijdend totaal

@param u JSON uitslag
@param totaal punten
 */
const TIJDELIJK_LID_NUMMER = 100;

function uitslagRij(u, totaal) {
    let datum = datumLeesbaar(u.datum);
    let linkRonde = href(u.rondeNummer,`ronde.html?ronde=${u.rondeNummer}&datum=${datum}`);
    if (u.tegenstanderNummer > TIJDELIJK_LID_NUMMER) {
        let linkSpeler = href(u.naam,`speler.html?speler=${u.tegenstanderNummer}&naam=${u.naam}`);
        return rij(linkRonde, datum, linkSpeler, "", u.witZwart, u.resultaat, u.punten, totaal);
    } else if (u.teamCode === "int") {
        return rij(linkRonde, datum, u.naam, "", "", "", u.punten, totaal);
    } else {
        let thuis = u.uithuis === "t" ? teamVoluit(u.teamCode) : u.tegenstander;
        let uit = u.uithuis === "u" ? teamVoluit(u.teamCode) : u.tegenstander;
        let linkTeam = href(`${thuis} - ${uit}`,`team.html?team=${u.teamCode}&ronde=${u.rondeNummer}`);
        return rij("", datum, linkTeam, u.bordNummer, u.witZwart, u.resultaat, u.punten, totaal);
    }
}
