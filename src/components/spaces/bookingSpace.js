import React from 'react'
import axios from 'axios'

import SpaceRepeatedField from '../lib/spaceRepeatedField'
import Calender from '../lib/calender'
import Auth from '../auth/userAuthentication'
import BookingModal from './bookingModal'
import HomePageDate from '../lib/homePageDate'

class BookingSpace extends React.Component{
  constructor() {
    super()

    this.state = {
      startDate: new Date(),
      endDate: new Date()
    }

    // this.dates = {
    //   start: moment(this.state.startDate),
    //   end: moment(this.state.endDate)
    // }

    this.handleChangeStart = this.handleChangeStart.bind(this)
    this.handleChangeEnd = this.handleChangeEnd.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  // new Date(Date.parse(HomePageDate.getStartDate()))
  // new Date(Date.parse(HomePageDate.getEndDate()))

  handleChangeStart(date) {
    this.setState({
      startDate: date
    })
  }
  handleChangeEnd(date) {
    this.setState({
      endDate: date
    })
  }

  componentDidMount(){
    this.getSpaces()
  }

  handleClick(e) {
    e.preventDefault()
    HomePageDate.removeStartDate()
    HomePageDate.removeEndDate()
  }

  handleSubmit(e) {
    e.preventDefault()
    this.postBooking()
  }

  postBooking(){
    axios.post('/api/bookings',
      this.state,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => console.log(res))
      .catch(err => this.setState({ errors: err.response.data.errors}))
  }
  getSpaces(){
    axios.get(`/api/spaces/${this.props.location.state}`)
      .then(res => this.setState({ space: res.data }))
  }

  render() {
    console.log(this.state.space)
    if(!this.state.space) return null
    return(
      <main>
        <SpaceRepeatedField
          space={this.state.space}
        />
        <form onSubmit={this.handleSubmit}>
          <Calender
            handleChangeEnd={this.handleChangeEnd}
            handleChangeStart={this.handleChangeStart}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            dates={this.state.space.bookingsDates}
          />
          <BookingModal />
          <button onClick={this.handleClick}>Confirm</button>
        </form>
      </main>
    )
  }
}

export default BookingSpace
