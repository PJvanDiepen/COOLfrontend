const seizoenen = document.getElementById("seizoenen");
seizoenen.appendChild(option("1819", "2018-2019"));
seizoenen.appendChild(option("1920", "2019-2020"));
seizoenen.appendChild(option("2021", "2020-2021"));
let seizoen = seizoenen.value;

const url = "http://localhost:3000/ranglijst/";

const tabel = document.getElementById("ranglijst");
tabel.setAttribute("border", "1");

// https://developer.mozilla.org/en-US/docs/Web/API/Window/location

alert("The URL of this page is: " + window.location.href);
const htmlBestanden = "/COOLfrontend";
const link = document.getElementById("link");
link.appendChild(naarSpeler(6212404, "ik zei de gek"));

function option(value, text) {
    let option = document.createElement('option');
    option.value = value;
    option.text = text;
    return option;
}

// https://stackoverflow.com/questions/43420870/responding-to-onclick-in-a-select-html-element/43420910
// TODO eventlistner i.p.v. onchange

function anderSeizoen() {
    geenRanglijst();
    seizoen = seizoenen.value;
    if (seizoen != "0000") {
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
    fetch(url + seizoen)
        .then(response => response.json())
        .then(spelers => {
            spelers.map((speler, index) => {
                tabel.appendChild(rij(index+1, speler.knsbNummer, speler.naam, speler.totaal));
            });
        });
}

function rij(...kolommen) {
    let tr = document.createElement('tr');
    kolommen.map(kolom => {
        let td = document.createElement('td');
        td.innerHTML = kolom;
        tr.appendChild(td);
    });
    return tr;
}

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web
// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

function naarSpeler(knsbNummer, naam) {
    let link = document.createElement('a');
    link.href = htmlBestanden + '/speler.html?seizoen=' + seizoen + '&speler=' + knsbNummer + '&naam=' + naam;
    link.text = naam;
    return link;
}