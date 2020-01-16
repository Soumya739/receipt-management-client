import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react'
import TableExpenseRow from '../components/TableExpenseRow'
import { connect } from 'react-redux';
// import { api } from '../services/api'

class ExpenditureLog extends Component {
    constructor() {
        super()
        this.state = {
            filterType: "",
        }
    }

    // componentDidMount() {
    //     // api.receipt.GetUserReceipts()
    // }

    showReceiptData = () => {
        return this.props.receipts.map(receipt => <TableExpenseRow receipt={receipt} key={receipt.id} />)
    }



    render() {
        return (
            <Table color="orange">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell><Icon name='map marker' />Store<Icon name='dropdown' /></Table.HeaderCell>
                        <Table.HeaderCell><Icon name='dollar sign' />Amount<Icon name='dropdown' /></Table.HeaderCell>
                        <Table.HeaderCell><Icon name='calendar alternate' />Bill Generated on<Icon name='dropdown' /></Table.HeaderCell>
                        <Table.HeaderCell><Icon name='tags' />Expense Type<Icon name='dropdown' /></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.showReceiptData()}
                </Table.Body>
            </Table>
        )
    }
}

const mapStateToProps = state => {
    return {
        receipts: state.receipts,
    }
}
export default connect(mapStateToProps, null)(ExpenditureLog)