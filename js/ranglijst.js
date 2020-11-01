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
const naarSpeler = url.pathname.replace("ranglijst.html","speler.html");
console.log("naarSpeler: " + naarSpeler);
ranglijst();

function seizoenOpties() {
    asyncFetch("/seizoenen",
        (seizoen) => {
            seizoenSelecteren.appendChild(option(seizoen.seizoen, seizoenVoluit(seizoen.seizoen)));
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
    seizoenKop.innerHTML = "Seizoen";
    while (tabel.childNodes.length > 2) {
        tabel.removeChild(tabel.lastChild);
    }
}

function ranglijst() {
    seizoenKop.innerHTML = "Seizoen " + seizoenVoluit(seizoen);
    asyncFetch("/ranglijst/" + seizoen,
        (speler, i) => {
            let linkSpeler = href(speler.naam,`speler.html?speler=${speler.knsbNummer}&naam=${speler.naam}`);
            tabel.appendChild(rij(i + 1, linkSpeler, speler.totaal));
        });
}

// Douglas Crockford: How JavaScript works p.7.4

function isbn_13_check_digit(isbn_12) {
    const string_of_digits = isbn_12.replace(/-/g, "");
    if (string_of_digits.length === 12) {
        const check = string_of_digits.split("").reduce(
            function (reduction, digit, digit_nr) {
                console.log({reduction, digit, digit_nr});
                return reduction + (
                    digit_nr % 2 === 0
                    ? Number(digit)
                    : Number(digit) * 3
                );
            },
            0
        ) % 10;
        return (
            check > 0
            ? 10 - check : check
        );
    }
}

let boek = "978-1-94-981500";
console.log("boek: " + boek + " check_digit: " + isbn_13_check_digit(boek));