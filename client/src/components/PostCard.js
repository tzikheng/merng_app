import React, { useContext } from 'react'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import CommentButton from './CommentButton'
import DeleteButton from './DeleteButton'
import LikeButton from './LikeButton'

function PostCard({
  post: {id, username, body, createdAt, likeCount, likes, commentCount}
  }){
  const { user } = useContext(AuthContext)
  return (
    <Card fluid style={{height: 170, width: 350, margin: 10}}>
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
        <Card.Description style={{wordWrap: 'break-word', height: 40, overflow: 'ellipsis'}}>
          {body.length>70? body.substring(0,70)+'...':body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likeCount, likes }}/>
        <CommentButton commentCount={commentCount} popUp='Comments' redirect={`/posts/${id}`}/>
        {user && user.username===username && 
          <DeleteButton postId={id}/>
        }
      </Card.Content>
    </Card>
  )
}

export default PostCard;