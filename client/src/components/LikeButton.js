import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Icon, Label, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { LIKE_POST_MUTATION } from '../utility/graphql.js'
import { AuthContext } from '../context/auth'

function LikeButton({ post: { id, likeCount, likes } }){
const [liked, setLiked] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION,{
    variables: { postId: id },
  })

const likeButton = user ? (
  liked ? (
    <Button color="purple" onClick={likePost}>
      <Icon name="heart" />
    </Button>
  ) : (
    <Button color="purple" basic onClick={likePost}>
      <Icon name="heart" />
    </Button>
  )
) : (
  <Button color="purple" basic as={Link} to="/login">
    <Icon name="heart" />
  </Button>
);

const popupContent = user ? (
  liked ? ( 
    'Unlike post'
    ) : (
      'Like post'
      )
  ) : (
    'Log in to like post'
  )

return (
  <Popup inverted content={popupContent} trigger={
    <Button as="div" labelPosition="right">
      {likeButton}
      <Label basic color="purple" pointing="left">
        {likeCount}
      </Label>
    </Button>
  }/>
);
}

export default LikeButton