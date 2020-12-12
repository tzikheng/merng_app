import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Card, Grid, Transition } from 'semantic-ui-react'

import PostForm from '../components/PostForm.js'
import PostCard from '../components/PostCard.js'
import { GET_POSTS_QUERY } from '../utility/graphql.js'

function Home() {
  const { loading, error, data} = useQuery(GET_POSTS_QUERY)
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
      return (
      <Grid>
        <Grid.Row className='page-title'>
          <h1>{data.posts ? 'Recent posts' : 'No posts yet'}</h1>
        </Grid.Row>
        <Grid.Row>
        <Card.Group centered>
          <Grid.Column>
            <PostForm/>
          </Grid.Column>
          {data.posts && (
            <Transition.Group>
              {data.posts.map((post)=>(
                <Grid.Column key={post.id}>
                  <PostCard post={post}/>
                </Grid.Column>
                ))}
              </Transition.Group>
                )}
        </Card.Group>
        </Grid.Row>
      </Grid>
      )
  }
}

export default Home


// Alternative logic/syntax for function Home()
// const { loading, data : {posts: posts} } = useQuery(GET_POSTS_QUERY)
  // if(!loading && !posts){
  //   return(
  //     <Grid columns={1}>
  //       <Grid.Row>
  //         <h1>No posts yet...</h1>
  //       </Grid.Row>
  //     </Grid>
  //   )} else {
  //   return (
  //     <Grid columns={3}>
  //       <Grid.Row>
  //         <h1>{'Home'}</h1>
  //       </Grid.Row>
  //       <Grid.Row>
  //         {loading ? (<h1>{'Loading...'}</h1>) : (
  //           posts &&
  //           posts.map((post)=>(
  //             <Grid.Column key={post.id} style={{marginBottom:20}}>
  //               <PostCard post={post}/>
  //             </Grid.Column>
  //           ))
  //         )}
  //       </Grid.Row>
  //     </Grid>
  //   )
  // }

  // const { loading, data } = useQuery(GET_POSTS_QUERY)
  // try {
  //   const posts = data.posts
  //   if(loading === false && !posts){
  //     return(
  //       <Grid columns={1}>
  //         <Grid.Row>
  //           <h1>No posts yet...</h1>
  //         </Grid.Row>
  //       </Grid>
  //     );
  //   }else{
  //     return (
  //       <Grid columns={3}>
  //         <Grid.Row>
  //           <h1>{'Home'}</h1>
  //         </Grid.Row>
  //         <Grid.Row>
  //           {loading ? (<h1>{'Loading...'}</h1>) : (
  //             posts &&
  //             posts.map((post)=>(
  //               <Grid.Column key={post.id} style={{marginBottom:20}}>
  //                 <PostCard post={post}/>
  //               </Grid.Column>
  //             ))
  //           )}
  //         </Grid.Row>
  //       </Grid>
  //     );
  //   }
  // } catch(error) {
  //   console.log(error)
  //   return null;
  // }