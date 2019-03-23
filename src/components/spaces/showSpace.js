import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class ShowSpace extends React.Component{
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount(){
    axios.get(`/api/spaces/${this.props.match.params.id}`)
      .then(res => this.setState({ space: res.data }))
  }

  render() {
    if(!this.state.space) return null
    const { space } = this.state
    return(
      <main>
        <div>{space.location}</div>
        <div>{space.suitability}</div>
        {space.images.map((image, id) => (
          <img key={id} src={image} />
        ))}
        <hr />
        <div>{space.type}</div>
        <div>{space.availability.toString()}</div>
        <div>£{space.price}</div>
        <div>{space.description}</div>
        <div>{space.electricChargingPoint.toString()}</div>
        <div>{space.owner.username}</div>
        <div>{space.comments[0].text}</div>
        <Link to={{
          pathname: '/bookings',
          state: `${space._id}`}
        }>
          <div>booking</div>
        </Link>
      </main>
    )
  }
}

export default ShowSpace
