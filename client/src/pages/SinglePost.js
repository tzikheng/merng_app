import React, { useContext, useState, useRef } from 'react'
import moment from 'moment'
import { Card, Form, Grid, Image, Transition } from 'semantic-ui-react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth'
import { GET_POST_QUERY, CREATE_COMMENT_MUTATION } from '../utility/graphql.js'
import DeleteButton from '../components/DeleteButton'
import LikeButton from '../components/LikeButton'
import CommentButton from '../components/CommentButton'

function SinglePost(props){
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext)
  const color = localStorage.getItem('color')
  const [comment, setComment] = useState('');
  const commentInputRef = useRef(null);
  const [createComment, { loading: creatingComment }] = useMutation(CREATE_COMMENT_MUTATION, {
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
      function deletePostCallback(){props.history.push('/')}
      postMarkup = (
        <Grid centered>
          <Grid.Row>

            <Grid.Column width={2}>
              <Image
                src={post.user.avatar}
                size='small'
                float='right'/>
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
                    post={{
                      id:post.id, 
                      likeCount:post.likeCount, 
                      likes:post.likes
                    }}
                    />
                    <CommentButton 
                      color={post.user.color} 
                      commentCount={post.commentCount}
                      popUp = {user?'Comments':'Log in to comment'}
                      redirect={user?'':'/login'}
                      // onClick={()=>console.log('Comment on post')} TODO: click to enter comment box
                      />
                    {user && user.id === post.user.id && (
                      <DeleteButton postId={post.id} callback={deletePostCallback}/>
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
                            />
                          <Card.Header>{comment.user.username}</Card.Header>
                          <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                          <Card.Description style={{wordWrap: 'break-word'}}>
                            {comment.body}
                            {user && user.id === comment.user.id && (
                              <DeleteButton postId={post.id} commentId={comment.id} />
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
      return postMarkup
    }
  }
}


export default SinglePost