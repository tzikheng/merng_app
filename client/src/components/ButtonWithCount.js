import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function ButtonWithCount({icon, count, onClickFunction, redirect}){
  return (
    <Button 
      as={redirect? Link : 'div'}
      labelPosition='right' 
      onClick={onClickFunction ?? onClickFunction} 
      to={redirect? redirect : null}>
    <Button color='purple' basic>
      <Icon name={icon} />
    </Button>
    <Label basic color='purple' pointing='left'>
      {count}
    </Label>
  </Button>
  )
}

export default ButtonWithCount