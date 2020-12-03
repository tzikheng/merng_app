module.exports.validateRegisterInput = (username, email, password, confirmPassword)=>{
  const errors = {}
  if(username.trim()===''){
    errors.username='Username must not be empty'
  }
  if(email.trim()===''){
    errors.email='Email must not be empty'
  } else {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(!email.match(regEx)){
      errors.email = 'Email must be a valid email address'
    }
  }
  if(password === ''){
    errors.password = 'Password must not be empty'
  } else if (password !== confirmPassword){
    errors.confirmPassword = 'Passwords must match'
  }
  return {
    errors, valid: Object.keys(errors).length < 1 // return valid TRUE if len(errors) === 0
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {}
  if(username.trim() === ''){
    errors.username='Username must not be empty'
  }
  if(password === ''){
    errors.password = 'Password must not be empty'
  }
  return {
    errors, valid: Object.keys(errors).length < 1
  }
}