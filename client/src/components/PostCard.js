import React, { useContext } from 'react'
import { Card } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import CommentButton from './CommentButton'
import DeleteButton from './DeleteButton'
import LikeButton from './LikeButton'
import UserAvatar from './UserAvatar'

function PostCard({post}){
  const { user } = useContext(AuthContext)
  const color = (user ? user.color : 'black')

  const postCard = (
    <Card 
      fluid 
      color={color} 
      style={{height: 160, width: 270, margin: 5}}>
      <UserAvatar item={post}/>
      <Card.Content href={`/posts/${post.id}`}>
        <Card.Description 
          className='body' 
          style={{wordWrap: 'break-word', height: 40, overflow: 'ellipsis'}}>
          {post.body.length>60? post.body.substring(0,60)+'...':post.body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton 
          type='post'
          item={{
            id:post.id, 
            likeCount:post.likeCount, 
            likes:post.likes
          }}
        />
        <CommentButton 
          color={color} 
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

  return (postCard)
}

export default PostCard;