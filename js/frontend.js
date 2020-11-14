'use strict';

/*
const
- url
- api
- params
- schaakVereniging
- seizoen

doorgeven:
- schaakVereniging
- seizoen
 */

const url = new URL(location);
const api = url.host.match("localhost") ? "http://localhost:3000" : "https://0-0-0.nl";
const params = url.searchParams;
const schaakVereniging = doorgeven("schaakVereniging");
const seizoen = doorgeven("seizoen");
const INTERNE_COMPETITIE = "int";

function doorgeven(key) {
    let value = params.get(key) || localStorage.getItem(key);
    localStorage.setItem(key, value);
    return value
}

async function asyncFetch(url, process) {
    try {
        let response = await fetch(api + url);
        let json = await response.json();
        json.map(process);
    } catch (e) {
        console.error(e);
    }
}

function option(value, text) {
    let option = document.createElement('option');
    option.value = value;
    option.text = text;
    return option;
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

function href(text, link) {
    let a = document.createElement('a');
    a.appendChild(document.createTextNode(text));
    a.href = link;
    return a;
}

function naarSpeler(knsbNummer, naam) {
    return href(naam,`speler.html?speler=${knsbNummer}&naam=${naam}`);
}

function naarRonde(rondeNummer, datum) {
    return href(rondeNummer,`ronde.html?ronde=${rondeNummer}&datum=${datum}`);
}

function datumLeesbaar(datumJson) {
    const d = new Date(datumJson);
    return `${voorloopNul(d.getDate())}-${voorloopNul(d.getMonth()+1)}-${d.getFullYear()}`;
}

function voorloopNul(getal) {
    return getal < 10 ? "0" + getal : getal;
}

function teamVoluit(teamCode) {
    return schaakVereniging + (teamCode.substring(1) === 'be' ? " " : " " + teamCode);
}

async function seizoenOpties(seizoenSelecteren, teamCode) {
    await asyncFetch("/seizoenen/" + teamCode,
        (team) => {
            seizoenSelecteren.appendChild(option(team.seizoen, seizoenVoluit(team.seizoen)));
        });
    console.log(seizoenSelecteren.lastChild.value)
    if (seizoen !== null) {
        seizoenSelecteren.value = seizoen;
    }
    seizoenSelecteren.addEventListener("input", anderSeizoen);
}

function seizoenVoluit(seizoen) {
    return "20" + seizoen.substring(0,2) + "-20" +  seizoen.substring(2,4);
}

function anderSeizoen() {
    localStorage.setItem("seizoen", seizoenSelecteren.value);
    location.reload();
}

function ranglijst(tabel) {
    document.getElementById("ranglijst").innerHTML = schaakVereniging + " " + seizoenVoluit(seizoen);
    asyncFetch("/ranglijst/" + seizoen,
        (speler, i) => {
            tabel.appendChild(rij(
                i + 1,
                naarSpeler(speler.knsbNummer,speler.naam),
                speler.totaal));
        });
}