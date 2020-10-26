'use strict'

/*
Uitslagen per ronde van de interne competitie

ronde.html:
- h1 id="ronde"
- table id="uitslagen"

URL searchParams:
- team
- ronde?

in localStarage:
- schaakVereniging
- seizoen
 */

const params = (new URL(document.location)).searchParams;
const teamNaam = document.getElementById('team');
teamNaam.innerHTML = teamVoluit(params.get('team'));
const rondeNummer = params.get('ronde');

const api = "http://localhost:3000";

function teamVoluit(teamCode) {
    return localStorage.getItem("schaakVereniging") + " " + teamCode;
}
