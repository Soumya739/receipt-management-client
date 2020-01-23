import React, { Component } from 'react';
import { Table, Icon, Dropdown } from 'semantic-ui-react'
import TableExpenseRow from '../components/TableExpenseRow'
import TotalSpending from '../components/TotalSpending'
import { api } from '../services/api'

// let { startDate, 
//     endDate,
//     filterType,
//     subFilterType,
//     onChangeFilterType,
//     onChangeSubFilterType,
//     onChangeTotalSpending } = this.props


class ExpenditureLog extends Component {
    constructor() {
        super()
        this.state = {
            options: [],
            receipts: [],
            filteredReceipts: [],
            filterType: "All",
            subFilterType: "All",
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
                        })
                )
            })
    }

    onChangeFilterType = (filterType) => {
        this.setState({ filterType: filterType })
    }

    onChangeSubFilterType = (subFilterType) => {
        this.setState({ subFilterType: subFilterType })
    }

    showReceiptData = () => {
        return this.state.receipts.map(receipt => {
            return <TableExpenseRow receipt={receipt} key={receipt.id} />
        })
    }

    getTotalSpending = () => {
        let Total_Spendings = 0
        this.state.receipts.map(receipt => {
            Total_Spendings = Total_Spendings + receipt.total_amount
        })
        return Total_Spendings
    }

    // handleReceiptFilter = (filterType, subFilterType = "all") => {
    //     this.props.onChangeFilterType(filterType)
    //     this.props.onChangeSubFilterType(subFilterType)
    // }

    handleStoreSelection = (e, { value }) => {
        if (value === "all") {
            this.onChangeFilterType("all")
            this.onChangeSubFilterType(value)
        } else {
            this.onChangeFilterType("store")
            this.onChangeSubFilterType(value)
        }
    }

    render() {
        return (
            <>
                {this.state.receipts.length !== 0 ?
                    <TotalSpending totalSpending={this.getTotalSpending()} />
                    : null
                }
                <Table color="orange">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><Icon name='map marker' /><strong><u>Store</u></strong><Icon name='dropdown' /><Dropdown placeholder='Store' id="store" selection options={this.state.options} onChange={this.handleStoreSelection} /></Table.HeaderCell>
                            <Table.HeaderCell><Icon name='dollar sign' /><strong><u>Amount</u></strong><Icon name='dropdown' /></Table.HeaderCell>
                            <Table.HeaderCell><Icon name='calendar alternate' /><strong><u>Bill Generated on</u></strong><Icon name='dropdown' /></Table.HeaderCell>
                            <Table.HeaderCell><Icon name='tags' /><strong><u>Expense Type</u></strong><Icon name='dropdown' /></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.showReceiptData()}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell>Total receipts: {this.state.receipts.length}</Table.HeaderCell>
                            <Table.HeaderCell>Total: {this.getTotalSpending()}</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </>
        )
    }
}

export default ExpenditureLog