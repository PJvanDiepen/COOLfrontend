'use strict'

/*
Ranglijst per seizoen

ranglijst.html:
- h1 id="ranglijst"
- select id="seizoenSelecteren"
- h1 id="seizoen"
- table id="spelers"

functions.js:
- schaakVereniging

in localStarage:
- seizoen
 */

const ranglijstKop = document.getElementById("ranglijst");
ranglijstKop.innerHTML = "Ranglijst " + schaakVereniging;

const seizoenKop = document.getElementById("seizoen");
const seizoenSelecteren = document.getElementById("seizoenSelecteren");
const geenSeizoen = seizoenSelecteren.value;
seizoenOpties();
seizoenSelecteren.addEventListener("input", anderSeizoen);

const tabel = document.getElementById("spelers");
ranglijst();

async function seizoenOpties() {
    await asyncFetch("/seizoenen",
        (seizoen) => {
            seizoenSelecteren.appendChild(option(seizoen.seizoen, seizoenVoluit(seizoen.seizoen)));
        });
    if (seizoen !== null) {
        seizoenSelecteren.value = seizoen;
    }
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
    seizoenKop.innerHTML = "Seizoen";
    while (tabel.childNodes.length > 2) {
        tabel.removeChild(tabel.lastChild);
    }
}

function ranglijst() {
    seizoenKop.innerHTML = "Seizoen " + seizoenVoluit(seizoen);
    asyncFetch("/ranglijst/" + seizoen,
        (speler, i) => {
            tabel.appendChild(rij(
                i + 1,
                naarSpeler(speler.knsbNummer,speler.naam),
                speler.totaal));
        });
}