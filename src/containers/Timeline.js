import React, { Component } from 'react'
import RangeCalendar from './RangeCalendar'
import TotalSpending from '../components/TotalSpending'
import ExpenditureLog from '../components/ExpenditureLog'

export class Timeline extends Component {
    render() {
        return (
            <div>
                <RangeCalendar />
                <TotalSpending />
                <ExpenditureLog />
            </div>
        )
    }
}

export default Timeline
