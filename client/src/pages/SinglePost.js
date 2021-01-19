import { useMutation, useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import React, { useContext, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Form, Grid, Image, Transition } from 'semantic-ui-react'
import CommentButton from '../components/CommentButton'
import DeleteButton from '../components/DeleteButton'
import LikeButton from '../components/LikeButton'
import { AuthContext } from '../context/auth'
import { CREATE_COMMENT_MUTATION, GET_POST_QUERY } from '../utility/gql_1.js'

function SinglePost(props){
  const { user } = useContext(AuthContext)
  const color = (user ? user.color : 'black')
  const postId = props.match.params.postId;
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');
  const [createComment, { loading: creatingComment }] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {postId: postId, body: comment},
    update() {
      setComment('');
      commentInputRef.current.blur();
    }
  });
  const { loading, error, data } = useQuery(GET_POST_QUERY, {
    variables: { parentId: postId }
  })
  let singlePostMarkup
  if(error){
    console.log(error)
    singlePostMarkup = (
      <Grid columns={4}>
          <Grid.Row className='page-title'>
            <h1>{'Loading...'}</h1>
          </Grid.Row>
      </Grid>
    )
  } else if(loading){
    singlePostMarkup = (
      <Grid columns={4}>
          <Grid.Row className='page-title'>
            <h1>{'Loading...'}</h1>
          </Grid.Row>
      </Grid>
    )
  } else {  
    const post = data.getPost
    if(!post){
      singlePostMarkup = (
        <Grid columns={4}>
            <Grid.Row className='page-title'>
              <h1>{'Post not found...'}</h1>
            </Grid.Row>
        </Grid>
      )
    } else {
      function deletePostCallback(){props.history.push('/')}
      singlePostMarkup = (
        <Grid centered>
          <Grid.Row>

            <Grid.Column width={2}>
              <Image
                src={post.user.avatar}
                size='small'
                rounded/>
              </Grid.Column>

              <Grid.Column width={10}>
                <Card 
                  fluid 
                  color={post.user.color} 
                  style={{minHeight: 170}}>
                  <Card.Content>
                    <Card.Header>{post.user.username}</Card.Header>
                    <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
                    <Card.Description style={{wordWrap: 'break-word'}}>
                      {post.body}
                    </Card.Description>
                  </Card.Content>
                  
                  <Card.Content extra>
                  <LikeButton 
                    color={post.user.color} 
                    type='post'
                    size='tiny'
                    item={{
                      id:post.id, 
                      likeCount:post.likeCount, 
                      likes:post.likes
                    }}
                    />
                    <CommentButton 
                      color={post.user.color}
                      size='tiny'
                      commentCount={post.commentCount}
                      popUp = {user?'Comments':'Log in to comment'}
                      redirect={user?'':'/login'}
                      />
                    {user && user.id === post.user.id && (
                      <DeleteButton type='post' size='tiny' parentId={post.id} callback={deletePostCallback}/>
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
                        onChange={(event) => setComment(event.target.value)} // FIXME: find a better way of doing this
                        ref={commentInputRef}
                        />
                      <button
                        type="submit"
                        className={`ui button ${color}`}
                        disabled={comment.trim() === '' || creatingComment}
                        onClick={createComment}
                        >
                        Submit
                      </button>
                    </div>
                  </Form>
                }

                {post.comments && (
                  <Transition.Group>
                    {post.comments.map((comment) => (
                      <Card 
                        fluid 
                        color={comment.user.color}
                        key={comment.id}>
                        <Card.Content>
                          <Image
                            floated='left'
                            size='mini'
                            src={comment.user.avatar}
                            rounded
                            />
                          <Card.Header>{comment.user.username}</Card.Header>
                          <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                          <Card.Description style={{wordWrap: 'break-word'}}>
                            {comment.body}
                            {user && user.id === comment.user.id && (
                              <DeleteButton type='comment' parentId={post.id} childId={comment.id} />
                            )}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    ))}
                    </Transition.Group>
                  )}
              </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }
  }
  return singlePostMarkup
}


export default withRouter(SinglePost)