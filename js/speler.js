// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

const params = (new URL(document.location)).searchParams;
const naam = document.getElementById("naam");
naam.innerHTML = params.get('naam');
let seizoen = params.get('seizoen');
let speler = params.get('speler');

const url = "http://localhost:3000";

const tabel = document.getElementById("uitslagen");
uitslagenlijst();

/*
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
  order by u.datum;

 Fetch JSON uitslagen en verwerk die met uitslagRij tot rijen voor de uitslagen tabel.
 */
function uitslagenlijst() {
    console.log(`uitslagenlijst seizoen=${seizoen} speler=${speler}`);
    let totaal = 0;
    fetch(url + "/uitslagen/" + seizoen + "/" + speler)
        .then(response => response.json())
        .then(uitslagen => {
            uitslagen.map((u) => {
                totaal = totaal + u.punten;
                tabel.appendChild(rij(u.rondeNummer, datumLeesbaar(u.datum), u.naam, u.bordNummer, u.witZwart, u.resultaat, u.punten, totaal));
            });
        });
}

/*
Verwerk een JSON uitslag tot een rij van 8 kolommen.

1. interne ronde
2. datum
3. interne tegenstander, externe wedstrijd of andere tekst
4. externe bord
5. kleur
6. resultaat
7. punten
8. voortschrijdend totaal

@param u JSON uitslag
 */

function datumLeesbaar(datumJson) {
    const d = new Date(datumJson);
    return voorloopNul(d.getDate()) + "-" + voorloopNul(d.getMonth()+1) + "-" + d.getFullYear();
}

function voorloopNul(getal) {
    return getal < 10 ? '0'+getal : getal;
}

function rij(...kolommen) {
    let tr = document.createElement('tr');
    kolommen.map(kolom => {
        let td = document.createElement('td');
        if (kolom.nodeType === Node.ELEMENT_NODE) {
            td.appendChild(kolom);
        } else {
            td.innerHTML = kolom;
        }
        tr.appendChild(td);
    });
    return tr;
}