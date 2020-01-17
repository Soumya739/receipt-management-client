import React, { Component } from 'react'
import RangeCalendar from './RangeCalendar'
import TotalSpending from '../components/TotalSpending'
import ExpenditureLog from './ExpenditureLog'
import { Segment, Header, Divider, Icon } from 'semantic-ui-react'

export class Timeline extends Component {
    constructor() {
        super()
        this.state = {
            startDate: "",
            endDate: "",
            totalSpending: "",
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

    onChangeTotalSpending = (amt) => {
        this.setState({ totalSpending: amt })
    }

    // onChangeSubFilterType = (subFilterType) => {
    //     this.setState({ subFilterType: subFilterType })
    // }


    render() {
        let { startDate, endDate, totalSpending } = this.state
        console.log(startDate, endDate)
        return (
            <div>
                <Segment>
                    <RangeCalendar onGetSummaryDataWithinRange={this.getSummaryDataWithinRange} />
                    <TotalSpending totalSpending={totalSpending} />
                    <Divider horizontal>
                        <Header as='h2'>
                            <Icon name='file alternate' />
                            Summary Data
                    </Header>
                    </Divider>
                    <ExpenditureLog
                        startDate={startDate}
                        endDate={endDate}
                        onChangeTotalSpending={this.onChangeTotalSpending}
                    />
                </Segment>
            </div>
        )
    }
}

export default Timeline
