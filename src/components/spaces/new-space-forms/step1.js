import React from 'react'

// GET LOCATION DATA

class Step1 extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    if(this.props.data.currentStep !== 1) {
      return null
    }
    const { data } = this.props
    return(
      <div>
        <input
          name="location"
          placeholder="Location"
          onChange={this.props.handleChange}
          value={data.location}
        />
      </div>
    )
  }
}

export default Step1
