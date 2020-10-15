'use strict'

const params = (new URL(document.location)).searchParams;
const teamNaam = document.getElementById('team');
teamNaam.innerHTML = "Waagtoren " + params.get('team');
const seizoen = params.get('seizoen');
const rondeNummer = params.get('ronde');

const api = "http://localhost:3000";