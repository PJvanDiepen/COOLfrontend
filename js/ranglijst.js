"use strict";

const seizoenen = document.getElementById("seizoenen");
const geenSeizoen = seizoenen.valueOf();
seizoenen.appendChild(option("1819", "2018-2019"));
seizoenen.appendChild(option("1920", "2019-2020"));
seizoenen.appendChild(option("2021", "2020-2021"));
let seizoen = localStorage.getItem("seizoen");
seizoenen.value = seizoen;
seizoenen.addEventListener("click", anderSeizoen);

const url = "http://localhost:3000/ranglijst/";

const tabel = document.getElementById("ranglijst");
tabel.setAttribute("border", "1");
window.addEventListener('load', anderSeizoen);

// https://developer.mozilla.org/en-US/docs/Web/API/URL

let href = new URL(location.href);
console.log("pathname: " + href.pathname);
console.log("hostname: " + href.hostname);
console.log("searchParams: " + href.searchParams);
console.log("href: " + href.href);

// console.log("path: " + href.substring( 0, href.lastIndexOf( "/" ) + 1));
const htmlBestanden = "/COOLfrontend"; // TODO niet hard coderen

function option(value, text) {
    let option = document.createElement('option');
    option.value = value;
    option.text = text;
    return option;
}

function anderSeizoen() {
    geenRanglijst();
    seizoen = seizoenen.value;
    localStorage.setItem("seizoen", seizoen);
    if (seizoen != geenSeizoen) {
        ranglijst();
    }
}

function geenRanglijst() {
    while (tabel.childNodes.length > 2) {
        tabel.removeChild(tabel.lastChild);
    }
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data

function ranglijst() {
    console.log("ranglijst seizoen=" + seizoen);
    fetch(url + seizoen)
        .then(response => response.json())
        .then(spelers => {
            spelers.map((speler, index) => {
                tabel.appendChild(rij(index+1, naarSpeler(speler.knsbNummer, speler.naam), speler.totaal));
            });
        });
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

function naarSpeler(knsbNummer, naam) {
    let a = document.createElement('a');
    a.appendChild(document.createTextNode(naam));
    a.title = naam;
    a.href = htmlBestanden + '/speler.html?seizoen=' + seizoen + '&speler=' + knsbNummer + '&naam=' + naam;
    return a;
}