
function roundToX(num, X) {    
  return +(Math.round(num + "e+"+X)  + "e-"+X);
}

export { roundToX }