// test4

// ------------------------------------------------------------------------------------------------------------------------
// Slidere fra HTML
// Verdier fra HTML som skal oppdateres ved input
// Andre verdier
// Legge til flere lukkertider senere?
// ------------------------------------------------------------------------------------------------------------------------

var isoSlider = document.getElementById("iso");
var isoResult = document.getElementById("isoResult");

var newIsoSlider = document.getElementById("newIso");
var newIsoResult = document.getElementById("newIsoResult");

var apertureSlider = document.getElementById("aperture");
var apertureResult = document.getElementById("apertureResult");

var newApertureSlider = document.getElementById("newAperture");
var newApertureResult = document.getElementById("newApertureResult");

var shutterspeedSlider = document.getElementById("shutterspeed");
var shutterspeedResult = document.getElementById("shutterspeedResult");

var ndSlider = document.getElementById("nd");
var ndResult = document.getElementById("ndResult");

var evResult = document.getElementById("ev");

var newShutterspeed = document.getElementById("newShutterspeed");

var filmSelect = document.getElementById("film-select")

var warningText = document.getElementById("warningText")

// ------------------------------------------------------------------------------------------------------------------------
// Sett alle verdier fra slidere og utregnede verdier - FRA OPPSTART
// ------------------------------------------------------------------------------------------------------------------------

isoResult.innerHTML = isoValues[isoSlider.value];
newIsoResult.innerHTML = isoValues[newIsoSlider.value];
apertureResult.innerHTML = apertureValues[apertureSlider.value];
newApertureResult.innerHTML = apertureValues[newApertureSlider.value];
shutterspeedResult.innerHTML = shutterspeedValues[shutterspeedSlider.value]; 
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
document.getElementById("film-select").addEventListener('change',() => {
  displayNewShutterspeed(); 
});

