import React from 'react';
import { Table, Icon } from 'semantic-ui-react'

const ExpenditureLog = () => {
    return (
        <Table color="orange">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell><Icon name='tags' />Expense Type<Icon name='dropdown' /></Table.HeaderCell>
                    <Table.HeaderCell><Icon name='map marker' />Store<Icon name='dropdown' /></Table.HeaderCell>
                    <Table.HeaderCell><Icon name='dollar sign' />Amount<Icon name='dropdown' /></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>Apples</Table.Cell>
                    <Table.Cell>200</Table.Cell>
                    <Table.Cell>0g</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Orange</Table.Cell>
                    <Table.Cell>310</Table.Cell>
                    <Table.Cell>0g</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}
export default ExpenditureLog