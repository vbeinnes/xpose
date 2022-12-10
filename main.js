
// ------------------------------------------------------------------------------------------------------------------------
// Slidere fra HTML
// Verdier fra HTML som skal oppdateres ved input
// Andre verdier
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


const appertureValues = [1, 1.2, 1.4, 1.8, 2, 2.4, 2.8, 3.5, 4, 4.8, 5.6, 6.7, 8, 9.5, 11, 13, 16, 19, 22, 27, 32];

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
    newShutterspeed.innerHTML = (ssNd.toFixed(3) + " seconds");
  } else {
    let reciprocityFactor = parseFloat(reciprocitySlider.value);
    let ssReciprocity = (ssNd ** reciprocityFactor);
    
    if (ssReciprocity < 60) {
      newShutterspeed.innerHTML = (ssReciprocity.toFixed(1)  + " seconds");
    } else {
      newShutterspeed.innerHTML = convertSeconds(Math.round(ssReciprocity));
    }
  }   
}


// Funksjon laget i samarbeid med https://chat.openai.com/, og modifisert med å bare vise det som ikke er 0, + år

function convertSeconds(seconds) {
  seconds = Number(seconds);
  const years = Math.floor(seconds / (365 * 24 * 60 * 60));
  const days = Math.floor(seconds % (365 * 24 * 60 * 60) / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const remainingSeconds = seconds % 60;

  const yearsShown = years > 0 ? years + ("y ") : "";
  const daysShown = days > 0 ? days + ("d ") : "";
  const hoursShown = hours > 0 ? hours + ("h ") : "";
  const minutesShown = minutes > 0 ? minutes + ("m ") : "";
  const secondsShown = remainingSeconds > 0 ? remainingSeconds + ("s ") : "";

  return yearsShown + daysShown + hoursShown + minutesShown + secondsShown;
}

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
// Oppdatere slider-verdier, evResult OG newShutterspeed ved input på en av tre øvre sliderne
// ------------------------------------------------------------------------------------------------------------------------

document.getElementById("iso").addEventListener('input',() => {
  isoResult.innerHTML = isoSlider.value;
  displayEv();
  displayNewShutterspeed();   
});
document.getElementById("apperture").addEventListener('input',() => {
  appertureResult.innerHTML = appertureValues[appertureSlider.value];
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
  newIsoResult.innerHTML = newIsoSlider.value;
  displayNewShutterspeed();  
});
document.getElementById("newApperture").addEventListener('input',() => {
  newAppertureResult.innerHTML = appertureValues[newAppertureSlider.value];
  displayNewShutterspeed(); 
});
document.getElementById("nd").addEventListener('input',() => {
  ndResult.innerHTML = (ndSlider.value + " stops");
  displayNewShutterspeed(); 
});
document.getElementById("reciprocity").addEventListener('input',() => {
  reciprocityResult.innerHTML = reciprocitySlider.value;
  displayNewShutterspeed(); 
});

