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
            options: [],
            selectedStore: "all"
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
        if (startDate !== "" && endDate !== "") {
            let filterStartDateMoment = moment(startDate, "YYYY-MM-DD");
            let filterEndDateMoment = moment(endDate, "YYYY-MM-DD");
            let tempDateFilteredReceipts = this.filterReceiptsBetweenDates(
                this.state.receipts, filterStartDateMoment, filterEndDateMoment
            )
            let allStores = tempDateFilteredReceipts.map(
                receipt => {
                    return receipt.store
                }
            )

            let uniqueStores = [...new Set(allStores)];

            let newFilteredReceiptStores = uniqueStores.map(store => ({ "key": store, "text": store, "value": store }))
            newFilteredReceiptStores.push({ "key": "All", "text": "All", "value": "all" })

            this.setState(
                {
                    selectedStore: "all",
                    filteredReceipts: tempDateFilteredReceipts,
                    startDate: filterStartDateMoment,
                    endDate: filterEndDateMoment,
                    options: newFilteredReceiptStores
                }, () => console.log(this.state.filteredReceipts)
            )
        }
    }

    filterReceiptByStore = (store) => {
        let tempDateFilteredReceipts = this.state.receipts;
        if (this.state.startDate !== "" && this.state.endDate !== "") {
            tempDateFilteredReceipts = this.filterReceiptsBetweenDates(
                this.state.receipts, this.state.startDate, this.state.endDate
            )
        }
        let tempStoreFilteredReceipts = tempDateFilteredReceipts.filter(receipt => {
            return ((receipt.store === store) || (store === "all"));
        }
        )
        this.setState(
            {
                filteredReceipts: tempStoreFilteredReceipts,
                selectedStore: store
            }, () => console.log(this.state.filteredReceipts)
        )

    }

    filterReceiptsBetweenDates = (receipts, startDateMoment, endDateMoment) => {
        let filteredReceipts = receipts.filter(receipt => {
            let receiptDateMoment = moment(receipt.generated_on, "YYYY-MM-DD");
            console.log(receiptDateMoment, startDateMoment, endDateMoment)
            return receiptDateMoment.isBetween(startDateMoment, endDateMoment);
        });
        return filteredReceipts;
    }

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
                        filterReceiptByStore={this.filterReceiptByStore}
                        tag={this.state.selectedStore}
                    />
                </Segment>
            </div>
        )
    }
}

export default Timeline
