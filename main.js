// test4

// ------------------------------------------------------------------------------------------------------------------------
// Slidere fra HTML
// Verdier fra HTML som skal oppdateres ved input
// Andre verdier
// Legge til flere lukkertider senere?
// ------------------------------------------------------------------------------------------------------------------------

const isoSlider = document.getElementById("iso");
const isoResult = document.getElementById("isoResult");

const newIsoSlider = document.getElementById("newIso");
const newIsoResult = document.getElementById("newIsoResult");

const apertureSlider = document.getElementById("aperture");
const apertureResult = document.getElementById("apertureResult");

const newApertureSlider = document.getElementById("newAperture");
const newApertureResult = document.getElementById("newApertureResult");

const shutterspeedSlider = document.getElementById("shutterspeed");
const shutterspeedResult = document.getElementById("shutterspeedResult");

const ndSlider = document.getElementById("nd");
const ndResult = document.getElementById("ndResult");

const evCompSlider = document.getElementById("evComp");
const evCompResult = document.getElementById("evCompResult");

const evResult = document.getElementById("ev");

const newShutterspeed = document.getElementById("newShutterspeed");

const filmSelect = document.getElementById("film-select")

const warningText = document.getElementById("warningText")

// ------------------------------------------------------------------------------------------------------------------------
// Sett alle verdier fra slidere og utregnede verdier - FRA OPPSTART
// ------------------------------------------------------------------------------------------------------------------------

isoResult.innerHTML = isoValues[isoSlider.value];
newIsoResult.innerHTML = isoValues[newIsoSlider.value];
apertureResult.innerHTML = apertureValues[apertureSlider.value];
newApertureResult.innerHTML = apertureValues[newApertureSlider.value];
shutterspeedResult.innerHTML = shutterspeedValues[shutterspeedSlider.value];
evCompResult.innerHTML = evCompValues[evCompSlider.value];
ndResult.innerHTML = (ndSlider.value + " stops");


displayEv();
displayNewShutterspeed();

// ------------------------------------------------------------------------------------------------------------------------
// Oppdatere slider-verdier, evResult OG newShutterspeed ved input på en av tre øvre sliderne
// ------------------------------------------------------------------------------------------------------------------------

document.getElementById("iso").addEventListener('input',() => {
  isoResult.innerHTML = isoValues[isoSlider.value];
  displayEv();
  displayNewShutterspeed();   
});
document.getElementById("aperture").addEventListener('input',() => {
  apertureResult.innerHTML = apertureValues[apertureSlider.value];
  displayEv();
  displayNewShutterspeed();    
});
document.getElementById("shutterspeed").addEventListener('input',() => {
  shutterspeedResult.innerHTML = shutterspeedValues[shutterspeedSlider.value];
  displayEv();
  displayNewShutterspeed();
});

// ------------------------------------------------------------------------------------------------------------------------
// Oppdatere BARE slider-verdier og newShutterspeed ved input på en av fire nedre sliderne
// ------------------------------------------------------------------------------------------------------------------------

document.getElementById("newIso").addEventListener('input',() => {
  newIsoResult.innerHTML = isoValues[newIsoSlider.value];
  displayNewShutterspeed();  
});
document.getElementById("newAperture").addEventListener('input',() => {
  newApertureResult.innerHTML = apertureValues[newApertureSlider.value];
  displayNewShutterspeed(); 
});
document.getElementById("nd").addEventListener('input',() => {
  ndResult.innerHTML = (ndSlider.value + " stops");
  displayNewShutterspeed(); 
});
document.getElementById("evComp").addEventListener('input',() => {
  evCompResult.innerHTML = evCompValues[evCompSlider.value];
  displayNewShutterspeed(); 
});
document.getElementById("film-select").addEventListener('change',() => {
  displayNewShutterspeed(); 
});

