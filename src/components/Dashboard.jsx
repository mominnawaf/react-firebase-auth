import React, { Component } from 'react'
import {Card, Button} from '@material-ui/core'
import './Dashboard.css'
import { CancelOutlined } from '@material-ui/icons'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {  }
    }
  render() {
    return (
      <>
      <Card className='profile-card'>
        <img src={this.props.image} alt="profile" />
        <h1>{this.props.name}</h1>
        <Button className='email-btn'>{this.props.email}</Button>
        <Button className='logout-btn' onClick={this.props.logout}>Logout</Button>
      </Card>
      </>
    )
  }
}
