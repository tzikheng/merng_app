
function roundToX(num, X) {    
  return +(Math.round(num + "e+"+X)  + "e-"+X);
}

function dictToArray(obj){
  let array = []
  for (const [key,value] of Object.entries(obj)) {
    if (value > 0) {
      array.push({'productId':key, 'quantity':value})
    }
  }
  return array
}

function keyValueArray(obj){
  let array = []
  for (const [key,value] of Object.entries(obj)) {
    if (value[1] > 0) {
      array.push({'productId':key, 'price':value[0], 'quantity':value[1]})
    }
  }
  return array
}

function fnNumItems(cart) {
  var sum = 0;
  cart.map((cartItem)=>(
    sum += cartItem.quantity
  ))
  return sum;
}

function fnTotalPrice(cart){
  var sum = 0
  cart.map((cartItem)=>(
    sum += cartItem.quantity * cartItem.price
  ))
  return sum
}

export { roundToX, dictToArray, keyValueArray, fnNumItems, fnTotalPrice }