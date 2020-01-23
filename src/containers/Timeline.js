import React, { Component } from 'react'
import RangeCalendar from './RangeCalendar'
import ExpenditureLog from './ExpenditureLog'
import { Segment, Header, Divider, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { api } from '../services/api'

export class Timeline extends Component {
    constructor() {
        super()
        this.state = {
            startDate: "",
            endDate: "",
            receipts: [],
            filteredReceipts: [],
            options: []
        }
    }

    componentDidMount() {
        return api.receipt.getAllStoresFromUserReceipts()
            .then(resp => {
                let newArray = resp.map(store => ({ "key": store, "text": store, "value": store }))
                newArray.push({ "key": "All", "text": "All", "value": "all" })
                return newArray
            })
            .then((newArray) => {
                this.setState({ options: newArray })
                return (
                    api.receipt.GetUserReceipts()
                        .then((res) => {
                            this.setState({ receipts: res })
                            this.setState({ filteredReceipts: res })
                        })
                )
            })
    }

    // getSummaryDataWithinRange = (startDate, endDate) => {
    //     this.setState({ startDate: startDate, endDate: endDate })
    // }


    getSummaryDataWithinRange = (startDate, endDate) => {
        console.log("getSummaryDataWithinRange")
        if (startDate !== "" && endDate !== "") {
            let filterStartDate = moment(startDate, "YYYY-MM-DD");
            let filterEndDate = moment(endDate, "YYYY-MM-DD");
            let tempFilteredReceipts = this.state.receipts.filter(receipt => {
                let receiptDate = moment(receipt.generated_on, "YYYY-MM-DD");
                console.log(receiptDate, filterEndDate, filterStartDate)
                return receiptDate.isBetween(filterStartDate, filterEndDate);
            }
            )
            let newFilteredReceiptStores = tempFilteredReceipts.map(store => ({ "key": store, "text": store, "value": store }))
            newFilteredReceiptStores.push({ "key": "All", "text": "All", "value": "all" })

            this.setState(
                {
                    filteredReceipts: tempFilteredReceipts,
                    startDate: startDate,
                    endDate: endDate
                }, () => console.log(this.state.filteredReceipts)
            )
        }
    }

    // filterReceiptByStore = (store) => {

    // }


    render() {
        let { startDate, endDate, filteredReceipts, options } = this.state
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
                        receipts={filteredReceipts}
                        options={options}
                    />
                </Segment>
            </div>
        )
    }
}

export default Timeline
