'use strict';

/*
Uitslagen per team

TODO alle uitslagen of per ronde

team.html:
- h1 id="team"
- table id="uitslagen"

URL searchParams:
- team
- ronde?

in localStorage:
- schaakVereniging
- seizoen
 */
const teamNaam = document.getElementById('team');
teamNaam.innerHTML = teamVoluit(params.get('team'));
const rondeNummer = params.get('ronde');
console.log(url);
