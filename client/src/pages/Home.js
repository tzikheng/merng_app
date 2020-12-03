import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Transition } from 'semantic-ui-react'

import PostForm from '../components/PostForm.js'
import PostCard from '../components/PostCard.js'
import { AuthContext } from '../context/auth.js'
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
    const posts = data.getPosts //{user && ()}
    return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>{posts ? 'Recent posts' : 'No posts yet'}</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <PostForm/>
        </Grid.Column>
        {posts && (
          <Transition.Group>
            {posts.map((post)=>(
              <Grid.Column key={post.id} style={{marginBottom:20}}>
                <PostCard post={post}/>
              </Grid.Column>
              ))}
            </Transition.Group>
              )}
      </Grid.Row>
    </Grid>
    );
  }
}

export default Home


// Alternative logic/syntax for function Home()
// const { loading, data : {getPosts: posts} } = useQuery(GET_POSTS_QUERY)
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
  //   const posts = data.getPosts
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