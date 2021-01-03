import moment from 'moment'
import React from 'react'
import { Feed, Header, Image } from 'semantic-ui-react'
import '../App.css'

const UserAvatar = ({item}) => (
  <Feed.Event>
    <Feed.Label>
      <Image className='avatarImage' src={item.user.avatar}/>
    </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <div className='avatarUsername'>{item.user.username}</div>
          <div className='avatarCreatedAt'>{moment(item.createdAt).fromNow()}</div>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
)

export default UserAvatar