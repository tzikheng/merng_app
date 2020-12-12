import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react'
import { DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION, GET_POSTS_QUERY } from '../utility/graphql.js'

function DeleteButton({ postId, commentId, callback }){
  const [confirmOpen, setConfirmOpen] = useState(false)
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
  
  const [deletePostOrComment] = useMutation(mutation,{
    variables: { postId, commentId },
    update(proxy){
      setConfirmOpen(false)
      if (!commentId){
        const data = proxy.readQuery({query: GET_POSTS_QUERY})
        const remainingPosts = data.posts.filter(post => post.id !== postId)
        proxy.writeQuery({ 
          query: GET_POSTS_QUERY,
          data: {posts: remainingPosts}
        })
      }
      if(callback) callback()
    }
  })

  return(
    <>
    <Popup inverted content={commentId? 'Delete comment':'Delete post'} trigger={
      <Button basic
        as='div'
        color='red' 
        floated='right'
        onClick={()=>setConfirmOpen(true)}>
        <Icon name='trash' style={{margin:0}}/>
      </Button>
    }/>
    <Confirm
      open={confirmOpen}
      onCancel={()=>setConfirmOpen(false)}
      onConfirm={deletePostOrComment}/>
    </>
  )
}

export default DeleteButton