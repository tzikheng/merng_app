import React, { useContext } from 'react'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import CommentButton from './CommentButton'
import DeleteButton from './DeleteButton'
import LikeButton from './LikeButton'

function PostCard({post}){
  const { user } = useContext(AuthContext)
  return (
    <Card 
      fluid 
      color={post.user.color} 
      style={{height: 180, width: 270, margin: 5}}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={post.user.avatar}
          rounded
          />
        <Card.Header style={{marginBottom:2}}>{post.user.username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${post.id}`}  style={{marginBottom:2}}>
          {moment(post.createdAt).fromNow()}
        </Card.Meta>
        <Card.Description className='body' style={{wordWrap: 'break-word', height: 40, overflow: 'ellipsis'}}>
          {post.body.length>60? post.body.substring(0,60)+'...':post.body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton 
          color={post.user.color} 
          type='post'
          item={{
            id:post.id, 
            likeCount:post.likeCount, 
            likes:post.likes
          }}
        />
        <CommentButton 
          color={post.user.color} 
          commentCount={post.commentCount} 
          popUp='Comments' 
          redirect={`/posts/${post.id}`}
        />
        {user && user.id===post.user.id && 
          <DeleteButton type='post' parentId={post.id}/>
        }
      </Card.Content>
    </Card>
  )
}

export default PostCard;