import React, { Component } from 'react'
import {Card, Button, Avatar} from '@material-ui/core'
import './Dashboard.css'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {  }
    }
  render() {
    return (
      <>
      <Card className='profile-card'>
        {
          this.props.image ? <img src={this.props.image} alt="profile" />
          : <Avatar/>
        }
        <h1>{this.props.name ? this.props.name : `Hello User`}</h1>
        <Button className='email-btn'>{this.props.email}</Button>
        <Button className='logout-btn' onClick={this.props.logout}>Logout</Button>
      </Card>
      </>
    )
  }
}
