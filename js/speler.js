// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

const params = (new URL(document.location)).searchParams;
const naam = document.getElementById("naam");
naam.innerHTML = params.get('naam');