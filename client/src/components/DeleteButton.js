import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { DELETE_POST_MUTATION, GET_POSTS_QUERY } from '../utility/graphql.js'

function DeleteButton({ postId, callback }){
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deletePost] = useMutation(DELETE_POST_MUTATION,{
    variables: { postId },
    update(proxy){
      setConfirmOpen(false)
      if(callback) callback()

      const data = proxy.readQuery({query: GET_POSTS_QUERY})
      const remainingPosts = data.getPosts.filter(post => post.id !== postId)
      proxy.writeQuery({ 
        query: GET_POSTS_QUERY,
        data: {getPosts: remainingPosts}
      })
    }
  })

  return(
    <>
      <Button basic
        as='div' 
        color='red' 
        floated='right'
        onClick={()=>setConfirmOpen(true)}>
        <Icon name='trash' style={{margin:0}}/>
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={()=>setConfirmOpen(false)}
        onConfirm={deletePost}
        />
      </>
  )
}

export default DeleteButton