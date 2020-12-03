import React, { useContext } from 'react'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ButtonWithCount from './ButtonWithCount'
import DeleteButton from './DeleteButton'
import LikeButton from './LikeButton'

function PostCard({
  post: {id, username, body, createdAt, likeCount, likes, commentCount, comments}
  }){
  const { user } = useContext(AuthContext)
  return (
    <Card fluid style={{minHeight: 170}}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header style={{marginBottom:2}}>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}  style={{marginBottom:2}}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likeCount, likes }}/>
        <ButtonWithCount icon='comments' count={commentCount} redirect={`/posts/${id}`}/>
        {user && user.username===username && 
          <DeleteButton postId={id}/>
        }
      </Card.Content>
    </Card>
  )
}

export default PostCard;