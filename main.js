

// ------------------------------------------------------------------------------------------------------------------------
// Slidere fra HTML
// Verdier fra HTML som skal oppdateres ved input
// ------------------------------------------------------------------------------------------------------------------------

var isoSlider = document.getElementById("iso");
var isoResult = document.getElementById("isoResult");

var newIsoSlider = document.getElementById("newIso");
var newIsoResult = document.getElementById("newIsoResult");

var appertureSlider = document.getElementById("apperture");
var appertureResult = document.getElementById("appertureResult");

var newAppertureSlider = document.getElementById("newApperture");
var newAppertureResult = document.getElementById("newAppertureResult");

var shutterspeedSlider = document.getElementById("shutterspeed");
var shutterspeedResult = document.getElementById("shutterspeedResult");

var ndSlider = document.getElementById("nd");
var ndResult = document.getElementById("ndResult");

var reciprocitySlider = document.getElementById("reciprocity");
var reciprocityResult = document.getElementById("reciprocityResult");

var evResult = document.getElementById("ev");

var newShutterspeed = document.getElementById("newShutterspeed");

// Andre verdier

const appertureValues = [1, 1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32];

const shutterspeedValues = [
  "1/8000", "1/4000", "1/2000", "1/1000", "1/500", "1/250", "1/125", "1/60","1/30", "1/15", "1/8", "1/4", "1/2", "1", "2", "4", "8", "15", "30"];

const shutterspeedValuesNum = [
  1/8000, 1/4000, 1/2000, 1/1000, 1/500, 1/250, 1/125, 1/60,1/30, 1/15, 1/8, 1/4, 1/2, 1, 2, 4, 8, 15, 30];

// ------------------------------------------------------------------------------------------------------------------------
// Funksjoner
// ------------------------------------------------------------------------------------------------------------------------

function calculateEv(){
  let iso = parseInt(isoSlider.value);
  let f = parseFloat(appertureValues[appertureSlider.value]);
  let ss = parseFloat(shutterspeedValuesNum[shutterspeedSlider.value]);
  return (Math.log2(f**2) + Math.log2(1/ss) - Math.log2(iso/100));
}

function displayEv() {
  evResult.innerHTML =  Math.round(calculateEv());  
}

function displayNewShutterspeed(){
  let iso2 = parseInt(newIsoSlider.value);
  let f2 = parseFloat(appertureValues[newAppertureSlider.value]);
  let newShutterspeedResult = (25 * (f2**2))/(2**((calculateEv())-2)*iso2);

  let ndValue = parseInt(ndSlider.value);
  let ssNd = newShutterspeedResult * (2 ** ndValue);

  if (ssNd < 1) {
    newShutterspeed.innerHTML = (ssNd.toFixed(3) + "s");
  } else {
    let reciprocityFactor = parseFloat(reciprocitySlider.value);
    let ssReciprocity = (ssNd ** reciprocityFactor);
    
    if (ssReciprocity < 60) {
      newShutterspeed.innerHTML = (ssReciprocity.toFixed(1)  + "s");
    } else {
      newShutterspeed.innerHTML = secondsToDhms(Math.round(ssReciprocity));
    }
  }   
}

// Funksjon: Fra sek. til ddddddd:hh:mm:ss (Modifisert fra funkson på nett:)
// https://stackoverflow.com/questions/36098913/convert-seconds-to-days-hours-minutes-and-seconds

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  
  var dDisplay = d > 0 ? d + ("d ") : "";
  var hDisplay = h > 0 ? h + ("h ") : "";
  var mDisplay = m > 0 ? m + ("m ") : "";
  var sDisplay = s > 0 ? s + ("s ") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
// Hjemmelaget alternativ som maxer på 23 timer og 59 min:
// newShutterspeed.innerHTML = (new Date(Math.round(ssReciprocity * 1000)).toISOString().slice(11, 19) + " (hh:mm:ss)");

// ------------------------------------------------------------------------------------------------------------------------
// Sett alle verdier fra slidere og utregnede verdier - FRA OPPSTART
// ------------------------------------------------------------------------------------------------------------------------

isoResult.innerHTML = isoSlider.value;
newIsoResult.innerHTML = newIsoSlider.value;
appertureResult.innerHTML = appertureValues[appertureSlider.value];
newAppertureResult.innerHTML = appertureValues[newAppertureSlider.value];
shutterspeedResult.innerHTML = shutterspeedValues[shutterspeedSlider.value]; 
ndResult.innerHTML = (ndSlider.value + " stops");
reciprocityResult.innerHTML = reciprocitySlider.value;

displayEv();

displayNewShutterspeed();

// ------------------------------------------------------------------------------------------------------------------------
// Sett alle verdier fra slidere - VED INPUT
// ------------------------------------------------------------------------------------------------------------------------

isoSlider.oninput = function() {
  isoResult.innerHTML = this.value;
}
newIsoSlider.oninput = function() {
  newIsoResult.innerHTML = this.value;
}
appertureSlider.oninput = function() {
  appertureResult.innerHTML = appertureValues[this.value];
}
newAppertureSlider.oninput = function() {
  newAppertureResult.innerHTML = appertureValues[this.value];
}
shutterspeedSlider.oninput = function() {
  shutterspeedResult.innerHTML = shutterspeedValues[this.value];
}
ndSlider.oninput = function() {
  ndResult.innerHTML = (ndSlider.value + " stops");
}
reciprocitySlider.oninput = function() {
  reciprocityResult.innerHTML = this.value;
}

// ------------------------------------------------------------------------------------------------------------------------
// Oppdatere evResult OG newShutterspeed ved input på en av tre øvre sliderne
// ------------------------------------------------------------------------------------------------------------------------

document.getElementById("iso").addEventListener('input',() => {
  displayEv();
  displayNewShutterspeed();   
});
document.getElementById("apperture").addEventListener('input',() => {
  displayEv();
  displayNewShutterspeed();    
});
document.getElementById("shutterspeed").addEventListener('input',() => {
  displayEv();
  displayNewShutterspeed(); 
});

// ------------------------------------------------------------------------------------------------------------------------
// Oppdatere BARE newShutterspeed ved input på en av fire nedre sliderne
// ------------------------------------------------------------------------------------------------------------------------

document.getElementById("newIso").addEventListener('input',() => {
  displayNewShutterspeed();  
});
document.getElementById("newApperture").addEventListener('input',() => {
  displayNewShutterspeed(); 
});
document.getElementById("nd").addEventListener('input',() => {
  displayNewShutterspeed(); 
});
document.getElementById("reciprocity").addEventListener('input',() => {
  displayNewShutterspeed(); 
});

