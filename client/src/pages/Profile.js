import { useMutation } from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Card, Form, Image } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { UPDATE_SETTINGS } from '../utility/graphql.js'
import { useForm } from '../utility/hooks'

function Profile(props) {
  const context = useContext(AuthContext)
  const _color = (context.user? (context.user.color || 'black') : 'black')
  const [newAvatar, setNewAvatar] = useState('')
  const [newColor, setNewColor] = useState(_color)
  const { onChange, onSubmit, values } = useForm(updateSettingsCallback, {
    avatar:'',
    bio:'',
    color:'',
    username:''
  }
  )
  const [updateSettings, {loading}] = useMutation(UPDATE_SETTINGS,{
    variables: values,
    onCompleted(data){
      context.update(data.updateSettings)
      props.history.push('/')
    }
  })
  function updateSettingsCallback(){updateSettings()}
    const { avatar:currentAvatar, bio, color, username } = context.user

    const colorOptions = [
      { key: 'black', value: 'black', text: 'Black' },
      { key: 'blue', value: 'blue', text: 'Blue' },
      { key: 'brown', value: 'brown', text: 'Brown' },
      { key: 'green', value: 'green', text: 'Green' },
      { key: 'orange', value: 'orange', text: 'Orange' },
      { key: 'pink', value: 'pink', text: 'Pink' },
      { key: 'purple', value: 'purple', text: 'Purple' },
      { key: 'red', value: 'red', text: 'Red' },
      { key: 'teal', value: 'teal', text: 'Teal' },
      { key: 'yellow', value: 'yellow', text: 'Yellow' },
      { key: 'white', value: 'white', text: 'White' },
    ]
    const avatarOptions = [
      'https://semantic-ui.com/images/avatar/large/elliot.jpg',
      'https://semantic-ui.com/images/avatar/large/stevie.jpg',
      'https://semantic-ui.com/images/avatar/large/helen.jpg',
      'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
      'https://semantic-ui.com/images/avatar2/large/kristy.png',
      'https://semantic-ui.com/images/avatar2/large/molly.png',
      'https://semantic-ui.com/images/avatar2/large/elyse.png',
      'https://semantic-ui.com/images/avatar2/large/matthew.png'
    ]

    function selectUserAvatar(newAvatar) {
      values.avatar = newAvatar
      setNewAvatar(newAvatar)
    }
    //onClick={fn} will invoke fn by default, will require definition: function fn(e){e.preventDefault()...}
    
    const settingsForm = (
      <div className='form-container'>
        <h1>{'Profile & settings'}</h1>
        <Form onSubmit={onSubmit} noValidate> 
          <Form.Input
            label='Username'
            placeholder={username}
            name='username'
            type='text'
            value={values.username}
            onChange={onChange}
          />
          <Form.Input
            label='Bio'
            placeholder={bio||"I've been to the moon!"}
            name='bio'
            type='text'
            value={values.bio}
            onChange={onChange}
          />
          <Form.Dropdown id='colorSelector'
            label='Color'
            placeholder={newColor.toString().charAt(0).toUpperCase() + newColor.toString().slice(1)}
            fluid
            selection
            options={colorOptions}
            onChange={(_, { value }) => {
              values.color = value
              setNewColor(value)
            }}
          />
          <Form.Input 
            label='Avatar' 
            onChange={onChange}>
          <div className='ui four cards'>
            {avatarOptions.map((avatar)=>(
              <Card key={avatar} onClick={()=>{selectUserAvatar(avatar)}}>
                <div className = 'image'>
                  { avatar === (newAvatar||currentAvatar.toString()) ? (
                    <div className={`ui ${newColor||color} right corner label`}>
                      <i className='bookmark icon'></i> 
                    </div>
                  ) : null}
                  <Image src={avatar}/>
                </div>
              </Card>
            ))}
          </div>
          </Form.Input>
          
          <Button type='submit' disabled={loading}>
            Submit
          </Button>
        </Form>
      </div>
    )
    return settingsForm
  }
// }

export default withRouter(Profile)