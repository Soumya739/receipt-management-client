import React, { Component } from 'react'
import ExpenseGraph from './ExpenseGraph'
import UploadReceipt from './UploadReceipt'
import ReceiptDetailsForm from './ReceiptDetailsForm'
import { Segment, Divider, Header, Icon } from 'semantic-ui-react'

export class Home extends Component {
    constructor() {
        super();
        this.state = {
            image: "",
            receiptFormSubmitted: false
        };
    }

    onImageUpload = (data) => {
        this.setState({ image: data })
    }
    onSubmitReceiptForm = () => {
        this.setState({ receiptFormSubmitted: !this.state.receiptFormSubmitted })
    }


    render() {
        return (

            <div>
                <Segment>
                    <UploadReceipt onImageUpload={this.onImageUpload} onSubmitReceiptForm={this.onSubmitReceiptForm} receiptFormSubmitted={this.state.receiptFormSubmitted} />
                    <Divider horizontal>And</Divider>
                    <ReceiptDetailsForm image={this.state.image} onSubmitReceiptForm={this.onSubmitReceiptForm} />
                </Segment>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='bar chart' />
                        Expense Chart
                    </Header>
                </Divider>
                <ExpenseGraph />

            </div>
        )
    }
}

export default Home
