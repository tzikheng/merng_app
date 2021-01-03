import { AuthContext } from '../context/auth';
import { useQuery } from '@apollo/react-hooks'
import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Grid, Transition } from 'semantic-ui-react'
import ProductCard from '../components/ProductCard.js'
import ProductForm from '../components/ProductForm.js' // TODO:
import { GET_PRODUCTS_QUERY } from '../utility/gql_2.js'

function Marketplace() {
  const { user } = useContext(AuthContext)
  const { loading, error, data} = useQuery(GET_PRODUCTS_QUERY)
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
        <h1>{data.products ? 'Marketplace' : 'No listings yet'}</h1>
      </Grid.Row>
      <Grid.Row>
      <Card.Group centered={true}>
        { user && (
        <Grid.Column>
          <ProductForm/>
        </Grid.Column>
        )}
        {data.products && (
          <Transition.Group>
            {data.products.map((product)=>(
              <Grid.Column key={product.id}>
                <ProductCard product={product}/>
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

export default withRouter(Marketplace)