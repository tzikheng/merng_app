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
      style={{height: 170, width: 350, margin: 10}}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={post.user.avatar}
          />
        <Card.Header style={{marginBottom:2}}>{post.user.username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${post.id}`}  style={{marginBottom:2}}>
          {moment(post.createdAt).fromNow()}
        </Card.Meta>
        <Card.Description style={{wordWrap: 'break-word', height: 40, overflow: 'ellipsis'}}>
          {post.body.length>70? post.body.substring(0,70)+'...':post.body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton 
          color={post.user.color} 
          post={{
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
        {user && user.username===post.user.username && 
          <DeleteButton postId={post.id}/>
        }
      </Card.Content>
    </Card>
  )
}

export default PostCard;


{/* <div className='ui link card' key={comment.id}>
  <div className='content'>
    {user && user.id === comment.user.id && (
      <DeleteButton postId={post.id} commentId={comment.id} />
    )}
    <div className='header'>{comment.user.username}</div>
    <div className='meta'>{moment(comment.createdAt).fromNow()}</div>
    <div className='description' style={{wordWrap: 'break-word'}}>
      {comment.body}
    </div>
  </div>
</div> */}