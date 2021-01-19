
function roundToX(num, X) {    
  return +(Math.round(num + "e+"+X)  + "e-"+X);
}

function dictToArray(dict){
  let array = []
  for (const [key,value] of Object.entries(dict)) {
    if (value > 0) {
      array.push({'productId':key, 'quantity':value})
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

export { roundToX, dictToArray, fnNumItems, fnTotalPrice }