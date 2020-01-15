import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import '../App.css'
import moment from 'moment'

export class RangeCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null
        }
    }

    render() {
        if (this.state.startDate && this.state.endDate) {
            console.log(this.state.startDate.format("YYYY-MM-DD"), this.state.endDate.format("YYYY-MM-DD"))
        }
        return (
            <div>
                <DateRangePicker
                    isOutsideRange={day => day.isAfter(moment())}
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </div>
        )
    }
}

export default RangeCalendar
