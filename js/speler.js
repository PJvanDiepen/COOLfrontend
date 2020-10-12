// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

const params = (new URL(document.location)).searchParams;
const naam = document.getElementById("naam");
naam.innerHTML = params.get('naam');
let seizoen = params.get('seizoen');
let speler = params.get('speler');

const url = "http://localhost:3000";

const tabel = document.getElementById("uitslagen");
uitslagenlijst();

function uitslagenlijst() {
    console.log(`uitslagenlijst seizoen=${seizoen} speler=${speler}`);
    fetch(url + "/uitslagen/" + seizoen + "/" + speler)
        .then(response => response.json())
        .then(uitslagen => {
            uitslagen.map((u) => {
                tabel.appendChild(rij(datumLeesbaar(u.datum), u.rondeNummer, u.witZwart, u.naam, u.resultaat, u.teamCode, u.tegenstander, u.plaats, u.punten));
            });
        });
}

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