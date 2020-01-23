import React, { Component } from 'react'
import RangeCalendar from './RangeCalendar'
import ExpenditureLog from './ExpenditureLog'
import { Segment, Header, Divider, Icon } from 'semantic-ui-react'

export class Timeline extends Component {
    constructor() {
        super()
        this.state = {
            startDate: "",
            endDate: "",
            // filterType: "All",
            // subFilterType: "All"
        }
    }

    getSummaryDataWithinRange = (startDate, endDate) => {
        this.setState({ startDate: startDate, endDate: endDate })
    }

    // onChangeFilterType = (filterType) => {
    //     this.setState({ filterType: filterType })
    // }

    // onChangeSubFilterType = (subFilterType) => {
    //     this.setState({ subFilterType: subFilterType })
    // }


    render() {
        let { startDate, endDate } = this.state
        console.log(startDate, endDate)
        return (
            <div >
                <Segment id="timeline">
                    <RangeCalendar onGetSummaryDataWithinRange={this.getSummaryDataWithinRange} />
                    <br></br>
                    <Divider horizontal section>
                        <Header as='h2'>
                            <Icon name='file alternate' />
                            Expense Summary
                    </Header>
                    </Divider>
                    <ExpenditureLog
                        startDate={startDate}
                        endDate={endDate}
                    />
                </Segment>
            </div>
        )
    }
}

export default Timeline
