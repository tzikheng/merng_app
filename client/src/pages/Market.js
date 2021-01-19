import { AuthContext } from '../context/auth';
import { useQuery } from '@apollo/react-hooks'
import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Grid, Transition } from 'semantic-ui-react'
import ProductCard from '../components/ProductCard.js'
import ProductForm from '../components/ProductForm.js'
import { GET_PRODUCTS_QUERY } from '../utility/gql_2.js'

function Market() {
  const { user } = useContext(AuthContext)
  const { loading, error, data} = useQuery(GET_PRODUCTS_QUERY)
  let marketMarkup
  if(error){
    console.log(error)
    marketMarkup = (
      <Grid columns={4}>
          <Grid.Row className='page-title'>
            <h1>{'Loading...'}</h1>
          </Grid.Row>
      </Grid>
    )
  } else if(loading){
    marketMarkup = (
      <Grid columns={4}>
        <Grid.Row className='page-title'>
          <h1>{'Loading...'}</h1>
        </Grid.Row>
      </Grid>
    )
  } else {
    marketMarkup = (
    <Grid>
      <Grid.Row className='page-title'>
        <h1>{data.products ? 'Market' : 'No listings yet'}</h1>
      </Grid.Row>
      <Grid.Row>
      <Card.Group centered={true}>
        <>
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
        </>
      </Card.Group>
      </Grid.Row>
    </Grid>
    )
  }
  return marketMarkup
}

export default withRouter(Market)