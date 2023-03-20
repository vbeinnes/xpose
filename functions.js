


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
        warningText.innerHTML = "";
      } else {
        newShutterspeed.innerHTML = shutterspeedValues[mapToClosestShutterspeedIndex(newShutterspeedResult, shutterspeedValuesNumMap)] + "s";
        warningText.innerHTML = "";
      }
    } else {  
      let ssReciprocity = calculateReciprocity(newShutterspeedResult);
      if (ssReciprocity < 60) {
        newShutterspeed.innerHTML = (ssReciprocity.toFixed(1)  + " seconds");
        warningText.innerHTML = "";
      } else {
        newShutterspeed.innerHTML = convertSeconds(Math.round(ssReciprocity));
        if (filmSelect.value == "none") {
          warningText.innerHTML = ""; // Should only give accuracy warning when using film
        }
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
  


  function convertSeconds(seconds) {
    seconds = Number(seconds);
    const years = Math.floor(seconds / (365 * 24 * 60 * 60));
    const days = Math.floor(seconds % (365 * 24 * 60 * 60) / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;
  
    const yearsShown = years > 0 ? years + (" years ") : "";
    const daysShown = days > 0 ? days + (" days ") : "";
    const hoursShown = hours > 0 ? hours + (" hours ") : "";
    const minutesShown = minutes > 0 ? minutes + (" minutes ") : "";
    const secondsShown = remainingSeconds > 0 ? remainingSeconds + (" seconds ") : "";
    
    if (years > 1000) {
        warningText.innerHTML = "Times above 24 hours are only rough estimations";
      return yearsShown;
  
    } else if (years > 0) {
        warningText.innerHTML = "Times above 24 hours are only rough estimations";
      return yearsShown + daysShown;
  
    } else if (days > 0) {
        warningText.innerHTML = "Times above 24 hours are only rough estimations";
      return daysShown + hoursShown;
  
    } else if (hours > 0) {
        warningText.innerHTML = "Times above 1 hour are less accurate";
      return hoursShown + minutesShown;
  
    } else {
        warningText.innerHTML = "Accuracy may vary slightly above 1 minute";
      return minutesShown + secondsShown;
    }
  }
  
  function mapToClosestShutterspeedIndex(num, values) {
    let diffs = values.map(value => Math.abs(value - num));
    let minIndex = diffs.indexOf(Math.min(...diffs));
    return minIndex;
  }