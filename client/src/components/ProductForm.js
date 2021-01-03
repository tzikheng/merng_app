import { useMutation } from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { Button, Card, Form, Grid } from 'semantic-ui-react'
import { AuthContext } from '../context/auth.js'
import { CREATE_PRODUCT_MUTATION, GET_PRODUCTS_QUERY } from '../utility/gql_2.js'
import { useForm } from '../utility/hooks'

function ProductForm() {
  const { user } = useContext(AuthContext)
  const color = (user? (user.color || 'black') : 'black')
  const [errors, setErrors] = useState({})
  const { onChange, onSubmit, values, setValues } = useForm(createProductCallback, {
    product_name:'',
    price:'',
    condition:'',
    description:'',
    images:''
  })
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: values,
    onError(error){
      error.graphQLErrors && setErrors(error.graphQLErrors[0].extensions.exception.errors)
    },
    update(proxy, result){
      const data = proxy.readQuery({query: GET_PRODUCTS_QUERY})
      proxy.writeQuery({
        query: GET_PRODUCTS_QUERY,
        data:{products: [result.data.createProduct, ...data.products]}
      })
    },
    onCompleted(){
      setValues({
        product_name:'',
        price:'',
        description:'',
        images:''
      })
      this.setState({condition:null})
    }
  })
  function createProductCallback(){createProduct()}
  
  const productForm = (
    <Card 
      fluid 
      color={color} 
      style={{height: 420, width: 240, margin: 5}}>
      <Card.Content>
        {user ? (
          <>
            <Card.Header 
              style={{marginBottom: 15}}>
              {'New item'}
            </Card.Header>
            <Card.Content>
              <Form 
                onSubmit={onSubmit}>
                  <Form.Input
                    label='Listing title'
                    placeholder='The Lord of the Rings'
                    name='product_name'
                    type='text'
                    value={values.product_name}
                    error={errors.product_name ? true : false}
                    onChange={onChange}
                    />
                  <Form.Group 
                    widths='equal' 
                    unstackable
                    style={{marginTop: 10, marginBottom: 15}}
                    >
                    <Form.Input
                      label='Price'
                      placeholder='15.00'
                      name='price'
                      type='text'
                      value={values.price}
                      error={errors.price ? true : false}
                      onChange={onChange}
                      width={1}
                      />
                    <Form.Dropdown //FIXME: revert to null after submission
                      label='Condition'
                      placeholder='New'
                      name='condition'
                      fluid
                      selection
                      options={[
                        { key: 'New', text: 'New', value: 'New' },
                        { key: 'Used', text: 'Used', value: 'Used' },
                      ]}
                      error={errors.condition ? true : false}
                      onChange={(_, { value }) => {
                        values.condition = value
                      }}
                      width={1}
                    />
                  </Form.Group>
                  <Form.Input
                    label='Description'
                    placeholder='A great series...'
                    name='description'
                    type='text'
                    value={values.description}
                    error={errors.description ? true : false}
                    onChange={onChange}
                    />
                  <Form.Input
                    label='Image'
                    placeholder='< Image link >'
                    name='images'
                    type='text'
                    value={values.images}
                    error={errors.images ? true : false}
                    onChange={onChange}
                    />
                <Button 
                  basic
                  color={user.color}
                  type='submit'
                  size='tiny'
                  style={{marginTop: 12}} 
                  loading={loading}>
                  List now
                </Button>
                
              </Form>
            </Card.Content>
          </>
        ) : (
          <Grid>
            <Grid 
              verticalAlign='middle' 
              columns={1} 
              centered>
              <Grid.Row>
                <Grid.Column>
                  <h2>{'Log in to list an item!'}</h2>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid>
        )}
      </Card.Content>
    </Card>
  )
  return (
    productForm
  )
}

export default ProductForm