function createNode(element) {
    return document.createElement(element);
}

function append(parent, element) {
    return parent.appendChild(element);
}

function appendOption(parent, value, text) {
    let option = createNode('option');
    option.value = value;
    option.text = text;
    return parent.appendChild(option);
}

function rij(kolommen) {
    let tr = createNode('tr');
    kolommen.map(kolom => {
        let td = createNode('td');
        td.innerHTML = kolom;
        append(tr, td);
    });
    return tr;
}

// https://stackoverflow.com/questions/43420870/responding-to-onclick-in-a-select-html-element/43420910
// TODO eventlistner i.p.v. onchange

function anderSeizoen() {
    geenRanglijst();
    let seizoen = seizoenen.value;
    if (seizoen != "0000") {
        ranglijst(seizoen);
    }
}

function geenRanglijst() {
    while (tabel.childNodes.length > 1) {
        tabel.removeChild(tabel.lastChild);
    }
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data

function ranglijst(seizoen) {
    fetch(url + seizoen)
        .then(response => response.json())
        .then(spelers => {
            spelers.map(speler => {
                append(tabel, rij([speler.knsbNummer, speler.naam, speler.totaal]));
            });
        });
}

//  ¯\_(ツ)_/¯

const seizoenen = document.getElementById("seizoenen");
appendOption(seizoenen, "1819", "2018-2019");
appendOption(seizoenen, "1920", "2019-2020");
appendOption(seizoenen, "2021", "2020-2021");

const url = "http://localhost:3000/ranglijst/";

const tabel = document.getElementById("ranglijst");
tabel.setAttribute("border", "1");
