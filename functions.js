
// Flipping the shutter speed lists if needed
function getShutterspeedLists(reverse = false) {
  return {
    values: reverse ? [...shutterspeedValuesRaw].reverse() : [...shutterspeedValuesRaw],
    nums: reverse ? [...shutterspeedValuesNumRaw].reverse() : [...shutterspeedValuesNumRaw],
  };
}

function calculateEv(){
    let iso = parseInt(isoValues[isoSlider.value]);
    let f = parseFloat(apertureValues[apertureSlider.value]);
    let ss = parseFloat(shutterspeedValuesNum[shutterspeedSlider.value]);
    return (Math.log2(f**2) + Math.log2(1/ss) - Math.log2(iso/100));
    // Returns EV as float
  }
  


  function displayEv() {
    let numberEv = Math.round(10 * calculateEv()) / 10;
    evResult.innerHTML =  numberEv + mapLightConditions(numberEv);  
    // Displays EV rounded to whole number
  }



  // Updates aperture slider based on pinhole-checkbox
  function updateNewApertureValues() {
    if (pinholeModeCheckbox.checked) {
      newApertureValues = apertureValuesPinhole;  // Switch to pinhole values
    } else {
      newApertureValues = normalApertureValues;  // Switch back to normal values
    }
    updateNewApertureSlider();
  }
  // Updates aperture slider min, max and start values based on pinhole-checkbox
  function updateNewApertureSlider() {
    const currentApertureValues = pinholeModeCheckbox.checked ? apertureValuesPinhole : normalApertureValues;
    newApertureSlider.max = currentApertureValues.length - 1;
    newApertureSlider.value = 0;
    newApertureResult.innerHTML = currentApertureValues[0];
  }



  function displayNewShutterspeed(){
    let iso2 = parseInt(isoValues[newIsoSlider.value]);
    let f2 = parseFloat(newApertureValues[newApertureSlider.value]);
    let ndValue = parseInt(ndSlider.value);
    let evCompValue = parseFloat(evCompValuesNum[evCompSlider.value]);
  
    let newShutterspeedResult = (25 * (f2**2))/(2**((calculateEv())-2)*iso2) * (2 ** ndValue) * (2 ** evCompValue);
  
    let ssReciprocity = calculateReciprocity(newShutterspeedResult);

    if (ssReciprocity < (1/285000)) {
      newShutterspeed.innerHTML = "Shorter than 1/250000s";
    } else if (ssReciprocity < 1) {
      newShutterspeed.innerHTML = shutterspeedValues[mapToClosestShutterspeedIndex(ssReciprocity, shutterspeedValuesNum)] + "s";
    } else if (ssReciprocity < 60) {
      newShutterspeed.innerHTML = (ssReciprocity.toFixed(1)  + " seconds");
    } else {
      newShutterspeed.innerHTML = convertSeconds(Math.round(ssReciprocity));
    } 
  }
  


  function calculateReciprocity(seconds){ // Takes ET in seconds, extends according to reciprocity failure of selected film
    let selectedFilmStock = filmSelect.value;
    switch (selectedFilmStock) {
      case "none":
        warningText.innerHTML = "&nbsp;";
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
      case "tmax100":
        return calculateTmax100(seconds);
      case "tmax400":
        return calculateTmax400(seconds);
      case "trix":
        return calculateTrix(seconds);
      case "velvia50":
        return calculateVelvia50(seconds);
      default:
        warningText.innerHTML = "There was a problem finding info for this film";
        return seconds;
    }
  }
  

  
  function calculateSfx(seconds){
    let message = "&nbsp;";
    let calculatedTime = (seconds ** 1.43);
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculatePanf(seconds){
    let message = "&nbsp;";
    let calculatedTime = (seconds ** 1.33);
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateD100(seconds){
    let message = "&nbsp;";
    let calculatedTime = (seconds ** 1.26);
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateD400(seconds){
    let message = "&nbsp;";
    let calculatedTime = (seconds ** 1.41);
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateD3200(seconds){
    let message = "&nbsp;";
    let calculatedTime = (seconds ** 1.33);
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateFp4(seconds){
    let message = "&nbsp;";
    let calculatedTime = (seconds ** 1.26);
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateHp5(seconds){
    let message = "&nbsp;";
    let calculatedTime = (seconds ** 1.31);
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateXp2(seconds){
    let message = "&nbsp;";
    let calculatedTime = (seconds ** 1.31);
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateK100(seconds){
    let message = "&nbsp;";
    let calculatedTime = (seconds ** 1.26);
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateK400(seconds){
    let message = "&nbsp;";
    let calculatedTime = (seconds ** 1.30);
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculatePortra160(seconds){
    let message = "&nbsp;";
    let calculatedTime = (0.87 * (seconds ** 1.358));
    if (seconds < 2) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 2 seconds";
      calculatedTime = seconds;
    }
    if (calculatedTime > (15*60)) {
      message = "Times above 15 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculatePortra400(seconds){
    let message = "&nbsp;";
    let calculatedTime = (0.87 * (seconds ** 1.358));
    if (seconds < 2) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 2 seconds";
      calculatedTime = seconds;
    }
    if (calculatedTime > (15*60)) {
      message = "Times above 15 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }
  

  function calculateEktar100(seconds){
    let message = "&nbsp;";
    let calculatedTime = (1.1 * (seconds ** 1.22));
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (35*60)) {
      message = "Times above 35 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateEktachromeE100(seconds){
    let message = "&nbsp;";
    let calculatedTime = ((seconds+1) ** (1/0.97))-1;
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (10*60)) {
      message = "Times above 10 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateTmax100(seconds){
    let message = "&nbsp;";
    let calculatedTime = (1.15 * (seconds ** 1.12));
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateTmax400(seconds){
    let message = "&nbsp;";
    let calculatedTime = 0;
    if (seconds >= 50) {
      calculatedTime = seconds ** 1.24;
    } else {
      calculatedTime = 0.067 * (seconds+15.3)**(1.825) - 9.7;
    }
    
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateTrix(seconds){
    let message = "&nbsp;";
    let calculatedTime = (1.8 * (seconds ** 1.42));
    if (seconds < 1) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 1 second";
      calculatedTime = seconds;
    }
    if (calculatedTime > (30*60)) {
      message = "Times above 30 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
  }

  function calculateVelvia50(seconds){
    let message = "&nbsp;";
    let calculatedTime = (0.8 * (seconds ** 1.26));
    if (seconds < 3) { // Not affected by reciprocity failure
      message = "Not affected by reciprocity failure until 3 seconds";
      calculatedTime = seconds;
    }
    if (calculatedTime > (5*60)) {
      message = "Times above 5 minutes are only rough estimations";
    }
    warningText.innerHTML = message;
    return calculatedTime;
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
      return yearsShown;
  
    } else if (years > 0) {
      return yearsShown + daysShown;
  
    } else if (days > 0) {
      return daysShown + hoursShown;
  
    } else if (hours > 0) {
      return hoursShown + minutesShown;
  
    } else {
      return minutesShown + secondsShown;
    }
  }
  
  function mapToClosestShutterspeedIndex(num, values) {
    let diffs = values.map(value => Math.abs(value - num));
    let minIndex = diffs.indexOf(Math.min(...diffs));
    return minIndex;
  }