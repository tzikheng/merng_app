import React from 'react'
import { Button, Icon, Label, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function CommentButton({commentCount, popUp, onClickFunction, redirect}){
  return (
    <>
    <Popup inverted content={popUp} trigger={
      <Button 
        as={redirect? Link : 'div'}
        labelPosition='right' 
        onClick={onClickFunction ?? onClickFunction} 
        to={redirect? redirect : null}>
        <Button color='purple' basic>
          <Icon name='comments' />
        </Button>
        <Label basic color='purple' pointing='left'>
          {commentCount}
        </Label>
      </Button>
    }/>
    </>
  )
}

export default CommentButton