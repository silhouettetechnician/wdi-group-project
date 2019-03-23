import React from 'react'

import DatePicker from 'react-datepicker'
import setMinutes from 'date-fns/setMinutes'
import setHours from 'date-fns/setHours'

import 'react-datepicker/dist/react-datepicker.css'

class Calender extends React.Component{

  render() {
    const { handleChangeEnd, handleChangeStart, startDate, endDate} = this.props
    return(
      <main>
        <DatePicker
          placeholderText="Click to select a date"
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={handleChangeStart}
          showTimeSelect
          timeFormat="HH:mm"
          injectTimes={[
            setHours(setMinutes(new Date(), 1), 0),
            setHours(setMinutes(new Date(), 5), 12),
            setHours(setMinutes(new Date(), 59), 23)
          ]}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <DatePicker
          placeholderText="Click to select a date"
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          onChange={handleChangeEnd}
          timeFormat="HH:mm"
          injectTimes={[
            setHours(setMinutes(new Date(), 1), 0),
            setHours(setMinutes(new Date(), 5), 12),
            setHours(setMinutes(new Date(), 59), 23)
          ]}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </main>
    )
  }
}



export default Calender
