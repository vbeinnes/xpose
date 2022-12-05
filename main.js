
// ISO

var isoSlider = document.getElementById("iso");
var isoTooltip = document.getElementById("isoTooltip");

isoTooltip.innerHTML = isoSlider.value;                                    // Vise ISO fra start

isoSlider.oninput = function() {                                           // Oppdatere ISO ved input
  isoTooltip.innerHTML = this.value;
}


// NEW ISO

var newIsoSlider = document.getElementById("newIso");
var newIsoTooltip = document.getElementById("newIsoTooltip");

newIsoTooltip.innerHTML = newIsoSlider.value;                                    // Vise NEW ISO fra start

newIsoSlider.oninput = function() {                                           // Oppdatere NEW ISO ved input
  newIsoTooltip.innerHTML = this.value;
}


// Apperture

var appertureSlider = document.getElementById("apperture");
var appertureTooltip = document.getElementById("appertureTooltip");
var appertureValues = [1, 1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32];

appertureTooltip.innerHTML = appertureValues[appertureSlider.value];        // Vise apperture fra start

appertureSlider.oninput = function() {                                      // Oppdatere apperture ved input
  appertureTooltip.innerHTML = appertureValues[this.value];
}

// NEW Apperture

var newAppertureSlider = document.getElementById("newApperture");
var newAppertureTooltip = document.getElementById("newAppertureTooltip");

newAppertureTooltip.innerHTML = appertureValues[newAppertureSlider.value];        // Vise NEW apperture fra start

newAppertureSlider.oninput = function() {                                      // Oppdatere NEWapperture ved input
  newAppertureTooltip.innerHTML = appertureValues[this.value];
}


// Shutter speed

var shutterspeedSlider = document.getElementById("shutterspeed");
var shutterspeedTooltip = document.getElementById("shutterspeedTooltip");

var shutterspeedValues = [
  "1/8000", "1/4000", "1/2000", "1/1000", "1/500", "1/250", "1/125", "1/60","1/30", "1/15", "1/8", "1/4", "1/2", "1", "2", "4", "8", "15", "30"
];
var shutterspeedValuesNum = [
  1/8000, 1/4000, 1/2000, 1/1000, 1/500, 1/250, 1/125, 1/60,1/30, 1/15, 1/8, 1/4, 1/2, 1, 2, 4, 8, 15, 30
];

shutterspeedTooltip.innerHTML = shutterspeedValues[shutterspeedSlider.value];           // Vise shutter speed fra start

shutterspeedSlider.oninput = function() {                                               // Oppdatere shutter speed ved input
  shutterspeedTooltip.innerHTML = shutterspeedValues[this.value];
}


// ND-filter

var ndSlider = document.getElementById("nd");
var ndTooltip = document.getElementById("ndTooltip");

ndTooltip.innerHTML = (ndSlider.value + " stops");                                                  // Vise ND fra start

ndSlider.oninput = function() {                                                         // Oppdatere ND ved input
  ndTooltip.innerHTML = (ndSlider.value + " stops");
}

// Reciprocity

var reciprocitySlider = document.getElementById("reciprocity");
var reciprocityTooltip = document.getElementById("reciprocityTooltip");

reciprocityTooltip.innerHTML = reciprocitySlider.value;                                 // Vise reciprocity fra start

reciprocitySlider.oninput = function() {                                                     // Oppdatere reciprocity ved input
  reciprocityTooltip.innerHTML = this.value;
}


// EV

var ev = document.getElementById("ev");
displayEv();                                                                            // Vise EV speed fra start

document.getElementById("iso").addEventListener('input',() => {                         // Oppdatere EV OG tid ved input på en av sliderne (ved å kalle displayEv)
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

document.getElementById("newIso").addEventListener('input',() => {                      // Oppdatere kun tid ved input på en av sliderne (ved å kalle displayEv)
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



//---------------------------------------------------------------------------------------------------------------------------------------------


// Funksjon: Fra sek. til ddddddd:hh:mm:ss

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}


// Funksjon: displayEv

function displayEv() {                                                                  // Funksjon som regner ut og viser EV
  let iso = parseInt(isoSlider.value);
  let f = parseFloat(appertureValues[appertureSlider.value]);
  let ss = parseFloat(shutterspeedValuesNum[shutterspeedSlider.value]);

  let evResult = Math.log2(f**2) + Math.log2(1/ss) - Math.log2(iso/100);

  ev.innerHTML =  Math.round(evResult);  
}


var newShutterspeed = document.getElementById("newShutterspeed");                         // Vise NEW shutter speed fra start

displayNewShutterspeed();

function displayNewShutterspeed(){                                                        // Funksjon som regner ut og viser NEW shutter speed
  let iso = parseInt(isoSlider.value);
  let f = parseFloat(appertureValues[appertureSlider.value]);
  let ss = parseFloat(shutterspeedValuesNum[shutterspeedSlider.value]);                 // Dette bør forenkles ved å hente fra den andre funksjonen

  let iso2 = parseInt(newIsoSlider.value);
  let f2 = parseFloat(appertureValues[newAppertureSlider.value]);

  let ev2 = Math.log2(f**2) + Math.log2(1/ss) - Math.log2(iso/100);
  let newShutterspeedResult = (25 * (f2**2))/(2**(ev2-2)*iso2);

  let ndValue = parseInt(ndSlider.value);
  let ssNd = newShutterspeedResult * (2 ** ndValue);

  if (ssNd < 1) {
    newShutterspeed.innerHTML = (ssNd.toFixed(3) + " seconds");
  } else {
    let reciprocityFactor = parseFloat(reciprocitySlider.value);
    let ssReciprocity = (ssNd ** reciprocityFactor);

    if (ssReciprocity < 60) {
      newShutterspeed.innerHTML = (ssReciprocity.toFixed(2)  + " seconds");
    } else {

      // Denne er hjemmelaget, og funker ok
      // newShutterspeed.innerHTML = (new Date(Math.round(ssReciprocity * 1000)).toISOString().slice(11, 19) + " (hh:mm:ss)");

      // Denne funksjonen er stjålet, og er smuuud
      // https://stackoverflow.com/questions/36098913/convert-seconds-to-days-hours-minutes-and-seconds
      newShutterspeed.innerHTML = secondsToDhms(Math.round(ssReciprocity));
    }
  }   
}


