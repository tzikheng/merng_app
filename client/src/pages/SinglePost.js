import React, { useContext, useState, useRef } from 'react'
import moment from 'moment'
import { Button, Card, Form, Grid, Icon, Image, Label, Transition } from 'semantic-ui-react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth'
import { GET_POST_QUERY, CREATE_COMMENT_MUTATION, DELETE_COMMENT_MUTATION } from '../utility/graphql.js'
import DeleteButton from '../components/DeleteButton'
import LikeButton from '../components/LikeButton'
import ButtonWithCount from '../components/ButtonWithCount'

function SinglePost(props){
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext)
  const [comment, setComment] = useState('');
  const commentInputRef = useRef(null);
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {postId: postId, body: comment},
    update() {
      setComment('');
      commentInputRef.current.blur();
    }
  });

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
        <Grid centered>
          <Grid.Row>

            <Grid.Column width={2} horizontalAlign="middle">
              <Image
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                size='small'
                float='right'/>
              </Grid.Column>

              <Grid.Column width={10} horizontalAlign="middle">
                <Card fluid style={{minHeight: 170}}>
                  <Card.Content>
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{body}</Card.Description>
                  </Card.Content>
                  
                  <Card.Content extra>
                    <LikeButton post={{ id, likeCount, likes }}/>
                    <ButtonWithCount icon='comments' count={commentCount} redirect={user?'':'/login'}
                      // onClick={()=>console.log('Comment on post')} TODO: click to enter comment box
                    />
                      {user && user.username === username && (
                        <DeleteButton postId={id} callback={deletePostCallback}/>
                      )}
                  </Card.Content>
                </Card>

                {user && 
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button purple"
                        disabled={comment.trim() === ''}
                        onClick={createComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                }

                {comments && (
                  <Transition.Group>
                    {comments.map((comment) => (
                      <Card fluid key={comment.id}>
                        <Card.Content>
                          {user.username === comment.username && (
                            <DeleteButton postId={id} commentId={comment.id} />
                          )}
                          <Card.Header>{comment.username}</Card.Header>
                          <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                          <Card.Description>{comment.body}</Card.Description>
                        </Card.Content>
                      </Card>
                    ))}
                    </Transition.Group>
                  )}
              </Grid.Column>
          </Grid.Row>
        </Grid>
      )
      return postMarkup
    }
  }
}


export default SinglePost