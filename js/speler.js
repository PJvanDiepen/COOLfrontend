// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

const params = (new URL(document.location)).searchParams;
const naam = document.getElementById("naam");
naam.innerHTML = params.get('naam');
let seizoen = params.get('seizoen');
let speler = params.get('speler');

const url = "http://localhost:3000/uitslagen/";

const tabel = document.getElementById("uitslagen");
tabel.setAttribute("border", "1");
uitslagenlijst();

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data

//{"datum":"2018-09-10T22:00:00.000Z","rondeNummer":1,"witZwart":"z","naam":"Kiek Schouten","resultaat":"½","teamCode":"int","tegenstander":"","plaats":"Alkmaar","punten":7}

function uitslagenlijst() {
    console.log(`uitslagenlijst seizoen=${seizoen} speler=${speler}`);
    fetch(url + seizoen + "/" + speler)
        .then(response => response.json())
        .then(uitslagen => {
            uitslagen.map((u) => {
                tabel.appendChild(rij(u.datum, u.rondeNummer, u.witZwart, u.naam, u.resultaat, u.teamCode, u.tegenstander, u.plaats, u.punten));
            });
        });
}

function rij(...kolommen) {
    let tr = document.createElement('tr');
    kolommen.map(kolom => {
        let td = document.createElement('td');
        if (kolom.nodeType === Node.ELEMENT_NODE) {
            td.appendChild(kolom);  // zie ranglijst.js
        } else {
            td.innerHTML = kolom;
        }
        tr.appendChild(td);
    });
    return tr;
}