import React from 'react'
import { Button, Icon, Label, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function CommentButton({color, size='mini', commentCount, popUp, onClickFunction, redirect}){
  return (
    <>
    <Popup inverted content={popUp} trigger={
      <Button 
        as={redirect? Link : 'div'}
        labelPosition='right' 
        onClick={onClickFunction}
        to={redirect? redirect : null}
        size={size}>
        <Button color={color} basic size={size}>
          <Icon name='comments' />
        </Button>
        <Label basic color={color} pointing='left'>
          {commentCount}
        </Label>
      </Button>
    }/>
    </>
  )
}

export default CommentButton