import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import '../App.css'
import moment from 'moment'
import { Button } from 'semantic-ui-react'

export class RangeCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null
        }
    }

    onDateSelection = () => {
        if (this.state.startDate && this.state.endDate) {
            this.props.onGetSummaryDataWithinRange(this.state.startDate.format("YYYY-MM-DD"), this.state.endDate.format("YYYY-MM-DD"))
        }
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <br></br>
                <DateRangePicker
                    isOutsideRange={day => day.isAfter(moment())}
                    startDate={this.state.startDate}
                    startDateId="your_unique_start_date_id"
                    endDate={this.state.endDate}
                    endDateId="your_unique_end_date_id"
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                />  <Button positive onClick={this.onDateSelection} size={"large"}>Get Summary</Button>
                <br></br>
            </div>
        )
    }
}

export default RangeCalendar
