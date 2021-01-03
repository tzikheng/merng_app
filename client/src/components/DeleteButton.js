import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react'
import { DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION, GET_POSTS_QUERY } from '../utility/gql_1.js'
import { DELETE_PRODUCT_MUTATION, DELETE_REVIEW_MUTATION, GET_PRODUCTS_QUERY } from '../utility/gql_2.js'

function DeleteButton({ size='mini', float='right', type, parentId, childId, callback }){
  const [confirmOpen, setConfirmOpen] = useState(false)
  
  let mutation
  let query
  switch(type){
    case 'post':
      mutation = DELETE_POST_MUTATION
      query = GET_POSTS_QUERY
      break
    case 'product':
      mutation = DELETE_PRODUCT_MUTATION
      query = GET_PRODUCTS_QUERY
      break
    case 'comment':
      mutation = DELETE_COMMENT_MUTATION
      query = null
      break
    case 'review':
      mutation = DELETE_REVIEW_MUTATION
      query = null
      break
    default:
      mutation = null
      query = null
  }

  const [_delete, { loading }] = useMutation(mutation,{
    variables: { parentId, childId },
    update(proxy){
      setConfirmOpen(false)
      if (!childId){
        try {
          const data = proxy.readQuery({query})
          if (data.posts){
          const remainingPosts = data.posts.filter(post => post.id !== parentId )
          proxy.writeQuery({ 
            query,
            data: {posts: remainingPosts}
          })
          } else if (data.products){
            const remainingProducts = data.products.filter(product => product.id !== parentId )
            proxy.writeQuery({ 
              query,
              data: {products: remainingProducts}
            })
          }
        } catch(err) {}
      }
      if(callback) callback()
    }
  })

  return(
    <>
    <Popup inverted content={`Delete ${type}`} trigger={
      <Button basic
        as='div'
        color='red'
        floated={float}
        onClick={()=>setConfirmOpen(true)}
        size={size}
        disabled={loading}
        loading={loading}>
        <Icon name='trash' style={{margin:0}}/>
      </Button>
    }/>
    <Confirm
      open={confirmOpen}
      onCancel={()=>setConfirmOpen(false)}
      onConfirm={_delete}/>
    </>
  )
}

export default DeleteButton