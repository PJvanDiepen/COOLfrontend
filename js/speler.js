'use strict'

/*
Uitslagen en kalender per speler

speler.html:
- h1 id="naam"
- table id="uitslagen"

URL searchParams:
- speler
- naam

in localStarage:
- schaakVereniging
- seizoen
 */
const url = new URL(location);
const api = url.host.match("localhost") ? "http://localhost:3000" : "https://chessopenings.online";

const params = url.searchParams;
const naam = document.getElementById("naam");
naam.innerHTML = params.get('naam');
const speler = params.get('speler'); // knsbNummer
const schaakVereniging = localStorage.getItem("schaakVereniging");
const seizoen = localStorage.getItem("seizoen")

const tabel = document.getElementById("uitslagen");
const naarSpeler = url.pathname;
const naarTeam = naarSpeler.replace("speler.html","team.html");
uitslagenlijst();

/*
 Fetch JSON uitslagen en verwerk die met uitslagRij tot rijen voor de uitslagen tabel.
 */

function uitslagenlijst() {
    let totaal = 300;
    asyncFetch(api + "/uitslagen/" + seizoen + "/" + speler,
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

1. interne ronde
2. datum
3. interne tegenstander, externe wedstrijd of andere tekst
4. externe bord
5. kleur
6. resultaat
7. punten
8. voortschrijdend totaal

@param u JSON uitslag
@param totaal punten
 */
function uitslagRij(u, totaal) {
    const datum = datumLeesbaar(u.datum);
    if (u.tegenstanderNummer > TIJDELIJK_LID_NUMMER) {
        let link = `${naarSpeler}?speler=${u.tegenstanderNummer}&naam=${u.naam}`;
        return rij(u.rondeNummer, datum, href(link, u.naam), "", u.witZwart, u.resultaat, u.punten, totaal);
    } else if (u.teamCode === 'int') {
        return rij(u.rondeNummer, datum, u.naam, "", "", "", u.punten, totaal);
    } else {
        let link = `${naarTeam}?team=${u.teamCode}&ronde=${u.rondeNummer}`;
        let thuis = u.uithuis === 't' ? teamVoluit(u.teamCode) : u.tegenstander;
        let uit = u.uithuis === 'u' ? teamVoluit(u.teamCode) : u.tegenstander;
        return rij("", datum, href(link, thuis + " - " + uit), u.bordNummer, u.witZwart, u.resultaat, u.punten, totaal);
    }
}

const TIJDELIJK_LID_NUMMER = 100;

function datumLeesbaar(datumJson) {
    const d = new Date(datumJson);
    return voorloopNul(d.getDate()) + "-" + voorloopNul(d.getMonth()+1) + "-" + d.getFullYear();
}

function voorloopNul(getal) {
    return getal < 10 ? '0'+getal : getal;
}

function teamVoluit(teamCode) {
    return schaakVereniging + (teamCode.substring(1) === 'be' ? " " : " " + teamCode);
}