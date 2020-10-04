const seizoenen = document.getElementById("seizoenen");
seizoenen.appendChild(option("1819", "2018-2019"));
seizoenen.appendChild(option("1920", "2019-2020"));
seizoenen.appendChild(option("2021", "2020-2021"));
const geenSeizoen = seizoenen.valueOf();
let seizoen = geenSeizoen;

const url = "http://localhost:3000/ranglijst/";

const tabel = document.getElementById("ranglijst");
tabel.setAttribute("border", "1");

// https://developer.mozilla.org/en-US/docs/Web/API/Window/location
// https://www.geeksforgeeks.org/how-to-get-the-file-name-from-full-path-using-javascript/
// alert("The URL of this page is: " + window.location.href);

const htmlBestanden = "/COOLfrontend"; // TODO niet hard coderen

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
    fetch(url + seizoen)
        .then(response => response.json())
        .then(spelers => {
            spelers.map((speler, index) => {
                // tabel.appendChild(rij(index+1, speler.naam, speler.totaal));
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