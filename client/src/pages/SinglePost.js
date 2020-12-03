import React, { useContext, useState } from 'react'
import moment from 'moment'
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth'
import { GET_POST_QUERY } from '../utility/graphql.js'
import DeleteButton from '../components/DeleteButton'
// import LikeButton from '../components/LikeButton'

function SinglePost(props){
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext)
  const { loading, error, data } = useQuery(GET_POST_QUERY, {
    variables: { postId }
  })
  if(error){
    console.log(error)
    return <p>{'Error encountered...'}</p>
  } else if(loading){
    return (
      <Grid columns={3}>
          <Grid.Row className='page-title'>
            <h1>{'Loading...'}</h1>
          </Grid.Row>
      </Grid>
    )
  } else {  
    let postMarkup;
    const post = data.getPost
    if(!post){
      postMarkup = <p>Post not found... </p>
    } else {
      const {id, body, createdAt, username, likes, likeCount, comments, commentCount} = post
      function deletePostCallback(){props.history.push('/')}
      postMarkup = (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                size='small'
                float='right'/>
              </Grid.Column>
              <Grid.Column width={10}>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr/>
                <Card.Content extra>
                  {/* <LikeButton user={user} post={{id, likeCount, likes}}/> */}
                  <Button
                    as='div'
                    labelPosition='right'
                    onClick={()=>console.log('Comment on post')}>
                      <Button basiccolor='purple'>
                        <Icon name='comments'/>
                      </Button>
                      <Label basic color='purple' pointing='left'>
                        {commentCount}
                      </Label>
                    </Button>
                    {user && user.username === username && (
                      <DeleteButton postId={id} callback={deletePostCallback}/>
                    )}
                </Card.Content>

              </Grid.Column>
          </Grid.Row>
        </Grid>
      )
      return postMarkup
    }
  }
}


export default SinglePost