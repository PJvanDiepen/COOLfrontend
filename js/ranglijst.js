"use strict";

const url = "http://localhost:3000";

const seizoenSelecteren = document.getElementById("seizoenSelecteren");
const geenSeizoen = seizoenSelecteren.value;
let seizoen = localStorage.getItem("seizoen");
verwerkSeizoenen();
seizoenSelecteren.addEventListener("change", anderSeizoen);

const tabel = document.getElementById("ranglijst");
tabel.setAttribute("border", "1");

// https://developer.mozilla.org/en-US/docs/Web/API/URL
let href = new URL(location.href);
const naarSpeler = href.pathname.replace("ranglijst.html","speler.html");
ranglijst();

function verwerkSeizoenen() {
    fetch(url + "/seizoenen")
        .then(response => response.json())
        .then(seizoenen => {
            seizoenen.map((seizoen) => {
                seizoenSelecteren.appendChild(option(seizoen.seizoen, seizoenVoluit(seizoen.seizoen)));
            });
        });
}

function seizoenVoluit(seizoen) {
    return "20" + seizoen.substring(0,2) + "-20" +  seizoen.substring(2,4);
}

function anderSeizoen() {
    geenRanglijst();
    seizoen = seizoenSelecteren.value;
    localStorage.setItem("seizoen", seizoen);
    if (seizoen !== geenSeizoen) {
        ranglijst();
    }
}

function geenRanglijst() {
    while (tabel.childNodes.length > 2) {
        tabel.removeChild(tabel.lastChild);
    }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

function ranglijst() {
    fetch(url + "/ranglijst/" + seizoen)
        .then(response => response.json())
        .then(spelers => {
            spelers.map((speler, i) => {
                tabel.appendChild(rij(i+1, hrefSpeler(speler.knsbNummer, speler.naam), speler.totaal));
            });
        });
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

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web

function hrefSpeler(knsbNummer, naam) {
    let a = document.createElement('a');
    a.appendChild(document.createTextNode(naam));
    a.title = naam;
    a.href = `${naarSpeler}?seizoen=${seizoen}&speler=${knsbNummer}&naam=${naam}`;
    return a;
}