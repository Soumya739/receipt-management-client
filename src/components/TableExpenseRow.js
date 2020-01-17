import React from 'react';
import { Table } from 'semantic-ui-react'

const TableExpenseRow = (props) => {
    return (
        <Table.Row>
            <Table.Cell>{props.receipt.store}</Table.Cell>
            <Table.Cell>{props.receipt.total_amount}</Table.Cell>
            <Table.Cell>{props.receipt.generated_on}</Table.Cell>
            {props.receipt.expense_type ?
                <Table.Cell>{props.receipt.expense_type.map((tag, index) => <li key={index}>{tag}</li>)}</Table.Cell>
                : null
            }
        </Table.Row>
    )
}
export default TableExpenseRow