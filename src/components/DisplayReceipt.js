import React from 'react';
import { Image, Button, Card, Icon } from 'semantic-ui-react'

const DisplayReceipt = (props) => {

    return (
        <div>
            <Card spaced>
                <Card.Content>
                    <Image
                        bordered
                        src={props.receipt.image.url}
                        as='a'
                        size='medium'
                        href={props.receipt.image.url}
                        target='_blank'
                    />
                    <Card.Description>
                        <strong><Icon name='map marker' />Store: {props.receipt.store}</strong>
                        <p><Icon name='calendar alternate' />Generated on: {props.receipt.generated_on}</p>
                        <p><Icon name='calendar alternate' />Total Amount: {props.receipt.total_amount}</p>
                        <p> Tags:
                            <ul>
                                {props.receipt.expense_type.map(tag => <li>{tag}</li>)}
                            </ul>
                        </p>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button color='red'>
                        Delete
                    </Button>
                </Card.Content>
            </Card>
        </div>
    )
}
export default DisplayReceipt