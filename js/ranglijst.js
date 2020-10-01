// https://www.valentinog.com/blog/html-table/
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces

function generate_table() {
    // get the reference for the body
    let body = document.getElementsByTagName("body")[0];

    // creates a <table> element and a <tbody> element
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");

    // creating all cells
    for (let i = 0; i < 5; i++) {
        // creates a table row
        let row = document.createElement("tr");

        for (let j = 0; j < 3; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            let cell = document.createElement("td");
            let cellText = document.createTextNode("cell in row "+i+", column "+j);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const tabel = document.getElementById('ranglijst');
const url = 'http://localhost:3000/ranglijst/1819';
fetch(url)
    .then(response => response.json())
    .then(data => {
        let spelers = data;
        spelers.map(speler => {
            let tr = createNode('tr');
            let tdNummer = createNode('td');
            tdNummer.innerHTML = speler.knsbNummer;
            append(tr, tdNummer);
            let tdNaam = createNode('td');
            tdNaam.innerHTML = speler.naam;
            append(tr, tdNaam);
            let tdTotaal = createNode('td');
            tdTotaal.innerHTML = speler.totaal;
            append(tr, tdTotaal);
            append(tabel, tr);
        });
    });

/*
let spelers = [
    {"knsbNummer":7099950,"naam":"Jos Vlaming","totaal":763},
    {"knsbNummer":7970094,"naam":"Danny de Ruiter","totaal":755},
    {"knsbNummer":7758014,"naam":"Alex Albrecht","totaal":685}];
spelers.map(speler => {
    let tr = createNode('tr');
    let tdNummer = createNode('td');
    tdNummer.innerHTML = speler.knsbNummer;
    append(tr, tdNummer);
    let tdNaam = createNode('td');
    tdNaam.innerHTML = speler.naam;
    append(tr, tdNaam);
    let tdTotaal = createNode('td');
    tdTotaal.innerHTML = speler.totaal;
    append(tr, tdTotaal);
    append(tabel, tr);
});
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log("Test 3");
        let spelers = data.results;
        console.log(spelers);
        return spelers.map(function(speler) {
            let tr = createNode('tr');
            let tdNummer = createNode('td');
            tdNummer.innerHTML = `${`speler.knsbNummer`}`;
            append(tr, tdNummer);
            let tdNaam = createNode('td');
            tdNaam.innerHTML = `${`speler.naam`}`;
            append(tr, tdNaam);
            let tdTotaal = createNode('td');
            tdNaam.innerHTML = `${`speler.totaal`}`;
            append(tr, tdTotaal);
            append(tabel, tr);
        })
    }).catch(function(error) {
        console.log(error);
    });
 */

    tabel.setAttribute("border", "2");