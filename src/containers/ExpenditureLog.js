import React, { Component } from 'react';
import { Table, Icon, Dropdown } from 'semantic-ui-react'
import TableExpenseRow from '../components/TableExpenseRow'
import TotalSpending from '../components/TotalSpending'


class ExpenditureLog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tag: ""
        }
    }

    showReceiptData = () => {
        return this.props.receipts.map(receipt => {
            return <TableExpenseRow receipt={receipt} key={receipt.id} />
        })
    }

    getTotalSpending = () => {
        let Total_Spendings = 0
        this.props.receipts.map(receipt => (
            Total_Spendings = Total_Spendings + receipt.total_amount
        ))
        return Total_Spendings
    }

    handleStoreSelection = (e, { value }) => {
        this.props.filterReceiptByStore(value)
    }

    render() {
        return (
            <>
                {this.props.receipts.length !== 0 ?
                    <TotalSpending totalSpending={this.getTotalSpending()} />
                    : null
                }
                <Table color="orange">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><Icon name='map marker' /><strong><u>Store</u></strong><Icon name='dropdown' />
                                <Dropdown placeholder='All' id="store" selection options={this.props.options} onChange={this.handleStoreSelection}
                                    value={this.props.tag}
                                    defaultValue={this.props.tag}
                                />
                            </Table.HeaderCell>
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
                            <Table.HeaderCell>Total receipts: {this.props.receipts.length}</Table.HeaderCell>
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