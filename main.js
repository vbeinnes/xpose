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


const apertureValues = [
  1, 1.1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.5, 2.8, 3.2, 3.5, 4, 4.5, 5,
  5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32, 36];

const shutterspeedValues = [
  "1/250000", "1/200000", "1/160000", "1/128000", "1/100000", "1/80000", "1/64000", "1/50000", "1/40000", "1/32000", "1/25000", "1/20000", "1/16000", "1/13000", "1/10000",
  "1/8000", "1/6400", "1/5000", "1/4000", "1/3200", "1/2500", "1/2000", "1/1600",
  "1/1250", "1/1000", "1/800", "1/640", "1/500", "1/400", "1/320", "1/250", "1/200",
  "1/160", "1/125", "1/100", "1/80", "1/60","1/50", "1/40", "1/30", "1/25", "1/20",
  "1/15", "1/13", "1/10", "1/8", "1/6", "1/5", "1/4", "1/3", "1/2.5", "1/2",  "1/1.6",
  "1/1.3", "1", "1.3", "1.5", "2", "2.5", "3", "4", "5", "6.5", "8", "10", "13", "15", "20", "25", "30"
];

const shutterspeedValuesNum = [
  1/250000, 1/200000, 1/160000, 1/128000, 1/100000, 1/80000, 1/64000, 1/50000, 1/40000, 1/32000, 1/25000, 1/20000, 1/16000, 1/13000, 1/10000,
  1/8000, 1/6400, 1/5000, 1/4000, 1/3200, 1/2500, 1/2000, 1/1600,
  1/1250, 1/1000, 1/800, 1/640, 1/500, 1/400, 1/320, 1/250, 1/200,
  1/160, 1/125, 1/100, 1/80, 1/60, 1/50, 1/40, 1/30, 1/25, 1/20,
  1/15, 1/13, 1/10, 1/8, 1/6, 1/5, 1/4, 1/3, 1/2.5, 1/2,  1/1.6,
  1/1.3, 1, 1.3, 1.5, 2, 2.5, 3, 4, 5, 6.5, 8, 10, 13, 15, 20, 25, 30
];

const shutterspeedValuesNumMap = [
  1/250000, 1/200000, 1/160000, 1/128000, 1/100000, 1/80000, 1/64000, 1/50000, 1/40000, 1/32000, 1/25000, 1/20000, 1/16000, 1/13000, 1/10000,
  1/8000, 1/6400, 1/5000, 1/4000, 1/3200, 1/2500, 1/2000, 1/1600,
  1/1250, 1/1000, 1/800, 1/640, 1/500, 1/400, 1/320, 1/250, 1/200,
  1/160, 1/125, 1/100, 1/80, 1/60, 1/50, 1/40, 1/30, 1/25, 1/20,
  1/15, 1/13, 1/10, 1/8, 1/6, 1/5, 1/4, 1/3, 1/2.5, 1/2,  1/1.6,
  1/1.3, 1 // For å unngå å sjekke mot tall større enn én hele tiden i mapToClosestShutterspeedIndex, når vi vet ssNd er mindre enn 1
];

const isoValues = [
  80, 100, 125, 160, 200, 250, 320, 400, 500, 640, 800, 1000, 1250, 1600, 2000, 2500,
  3200, 4000, 5000, 6400, 8000, 10000, 12800, 16000, 20000, 25600, 32000, 40000, 51200, 64000, 80000, 102400
];

// ------------------------------------------------------------------------------------------------------------------------
// Funksjoner
// ------------------------------------------------------------------------------------------------------------------------

function calculateEv(){
  let iso = parseInt(isoValues[isoSlider.value]);
  let f = parseFloat(apertureValues[apertureSlider.value]);
  let ss = parseFloat(shutterspeedValuesNum[shutterspeedSlider.value]);
  return (Math.log2(f**2) + Math.log2(1/ss) - Math.log2(iso/100));
  // Returns EV as float
}

function displayEv() {
  let wholeNumberEv = Math.round(calculateEv());
  evResult.innerHTML =  wholeNumberEv + mapLightConditions(wholeNumberEv);  
  // Displays EV rounded to whole number
}

function displayNewShutterspeed(){
  let iso2 = parseInt(isoValues[newIsoSlider.value]);
  let f2 = parseFloat(apertureValues[newApertureSlider.value]);
  let ndValue = parseInt(ndSlider.value);

  let newShutterspeedResult = (25 * (f2**2))/(2**((calculateEv())-2)*iso2) * (2 ** ndValue);


  if (newShutterspeedResult < 1) {
    if (newShutterspeedResult < (1/285000)) {
      newShutterspeed.innerHTML = "Shorter than 1/250000s";
    } else {
      newShutterspeed.innerHTML = shutterspeedValues[mapToClosestShutterspeedIndex(newShutterspeedResult, shutterspeedValuesNumMap)] + "s";
    }

  } else {  
    let ssReciprocity = calculateReciprocity(newShutterspeedResult);

    if (ssReciprocity < 60) {
      newShutterspeed.innerHTML = (ssReciprocity.toFixed(1)  + " seconds");
    } else {
      newShutterspeed.innerHTML = convertSeconds(Math.round(ssReciprocity));
    }
  }   
}

function calculateReciprocity(seconds){ // Takes ET in seconds, extends according to reciprocity failure of selected film
  let selectedFilmStock = filmSelect.value;

  switch (selectedFilmStock) {
    case "none":
      return seconds;
    case "sfx":
      return calculateSfx(seconds);
    case "panf":
      return calculatePanf(seconds);
    case "d100":
      return calculateD100(seconds);
    case "d400":
      return calculateD400(seconds);
    case "d3200":
      return calculateD3200(seconds);
    case "fp4":
      return calculateFp4(seconds);
    case "hp5":
      return calculateHp5(seconds);
    case "xp2":
      return calculateXp2(seconds);
    case "k100":
      return calculateK100(seconds);
    case "k400":
      return calculateK400(seconds);
    case "portra160":
      return calculatePortra160(seconds);
    case "portra400":
      return calculatePortra400(seconds);
    case "ektar100":
      return calculateEktar100(seconds);
    case "ektachromeE100":
      return calculateEktachromeE100(seconds);
    case "velvia50":
      return calculateVelvia50(seconds);

    default:
      // Handle error case
      break;
  }
}


function calculateSfx(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (seconds ** 1.43);
}
function calculatePanf(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (seconds ** 1.33);
}
function calculateD100(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (seconds ** 1.26);
}
function calculateD400(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (seconds ** 1.41);
}
function calculateD3200(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (seconds ** 1.33);
}
function calculateFp4(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (seconds ** 1.26);
}
function calculateHp5(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (seconds ** 1.31);
}
function calculateXp2(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (seconds ** 1.31);
}
function calculateK100(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (seconds ** 1.26);
}
function calculateK400(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (seconds ** 1.30);
}
function calculatePortra160(seconds){
  if (seconds < 2) {
    return seconds;
  }
  return (0.87 * (seconds ** 1.358));
}
function calculatePortra400(seconds){
  if (seconds < 2) {
    return seconds;
  }
  return (0.87 * (seconds ** 1.358));
}
function calculateEktar100(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (1.1 * (seconds ** 1.22));
}
function calculateEktachromeE100(seconds){
  if (seconds < 1) {
    return seconds;
  }
  return (((seconds+1) ** (1/0.97))-1);
}
function calculateVelvia50(seconds){
  if (seconds < 3) {
    return seconds;
  }
  return (0.8 * (seconds ** 1.26));
}



function mapLightConditions(ev) {
  let lightConditions = ""
  if (ev >= 21) {
    lightConditions = " - Extremely bright";
  } else if (ev >= 17) {
    lightConditions = " - Strong artificial lighting";
  } else if (ev >= 14) {
    lightConditions = " - Bright sunlight";
  } else if (ev >= 12) {
    lightConditions = " - Bright overcast";
  } else if (ev >= 10) {
    lightConditions = " - Overcast/sunset";
  } else if (ev >= 8) {
    lightConditions = " - Bright indoors";
  } else if (ev >= 4) {
    lightConditions = " - Indoor";
  } else if (ev >= 2) {
    lightConditions = " - Well lit night scene";
  } else if (ev >= 1) {
    lightConditions = " - Distant skyline";
  } else if (ev >= -2) {
    lightConditions = " - Full moon";
  } else if (ev >= -6) {
    lightConditions = " - Starlight";
  } else {
    lightConditions = " - Pitch black";
  }
  return lightConditions;
}


// Funksjoner laget i samarbeid med https://chat.openai.com/, og modifisert til å passe

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
  
  /*
  if (years > 9) {
    return "More than ten years";

  } else if (years > 0) {
    return "Roughly " + yearsShown + daysShown;

  } else if (days > 0) {
    return "Roughly " + daysShown + hoursShown;

  } else if (hours > 0) {
    return hoursShown + minutesShown;

  } else {
    return minutesShown + secondsShown;
  }
  */

  if (years > 0) {
    return "More than 3 days";
  
  } else if (days > 2) {
    return "More than 3 days";
      
  } else if (days > 0) {
    return "Roughly " + daysShown + hoursShown;

  } else if (hours > 0) {
    return "Roughly " + hoursShown + minutesShown;

  } else {
    return minutesShown + secondsShown;
  }
  
}

function mapToClosestShutterspeedIndex(num, values) {
  // First, we need to find the absolute difference between the input number
  // and each of the values in the given array
  let diffs = values.map(value => Math.abs(value - num));
  // Next, we need to find the index of the smallest difference in the array
  let minIndex = diffs.indexOf(Math.min(...diffs));
  // Finally, we return the value from the given array that has the smallest difference
  // with the input number
  return minIndex;
}

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

