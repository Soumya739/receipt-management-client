import React, { Component } from 'react'
import RangeCalendar from './RangeCalendar'
import TotalSpending from '../components/TotalSpending'
import ExpenditureLog from './ExpenditureLog'
import { Segment, Header, Divider, Icon } from 'semantic-ui-react'

export class Timeline extends Component {
    render() {
        return (
            <div>
                <Segment>
                    <RangeCalendar />
                    <TotalSpending />
                    <Divider horizontal>
                        <Header as='h2'>
                            <Icon name='file alternate' />
                            Summary Data
                    </Header>
                    </Divider>
                    <ExpenditureLog />
                </Segment>
            </div>
        )
    }
}

export default Timeline
