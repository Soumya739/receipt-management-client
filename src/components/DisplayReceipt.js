import React, { Component } from 'react';
import { Image, Button, Card, Icon } from 'semantic-ui-react'
import { api } from '../services/api';

class DisplayReceipt extends Component {
    constructor() {
        super()
        this.state = {
            imageDeleted: false
        }
    }

    deleteReceipt = () => {
        console.log("deleting")
        api.receipt.deleteAReceipt(this.props.receipt.id)
            .then(res => {
                this.props.handleGetReceipts()
            })

    }
    render() {
        let { image, store, generated_on, total_amount, expense_type } = this.props.receipt
        return (
            <div>
                {this.state.imageDeleted === false ?
                    <Card>
                        <Card.Content>
                            <Image
                                bordered
                                src={image.url}
                                as='a'
                                size='medium'
                                href={image.url}
                                target='_blank'
                            />
                            <Card.Description>
                                <strong><Icon name='map marker' />Store: {store}</strong>
                                <p><Icon name='calendar alternate' />Generated on: {generated_on}</p>
                                <p><Icon name='calendar alternate' />Total Amount: {total_amount}</p>
                                <p> Tags:</p>
                                {expense_type ?
                                    <ul>
                                        {expense_type.map((tag, index) => <li key={index}>{tag}</li>)}
                                    </ul>
                                    : null
                                }
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button color='red' type="reset" onClick={this.deleteReceipt}>
                                Delete
                        </Button>
                        </Card.Content>
                    </Card>
                    : null
                }
            </div>
        )
    }
}
export default DisplayReceipt