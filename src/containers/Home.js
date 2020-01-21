import React, { Component } from 'react'
import ExpenseGraph from './ExpenseGraph'
import UploadReceipt from './UploadReceipt'
import ReceiptDetailsForm from './ReceiptDetailsForm'
import { Segment, Divider, Header, Icon } from 'semantic-ui-react'

export class Home extends Component {
    constructor() {
        super();
        this.state = {
            imageData: [],
            receiptFormSubmitted: false,
            receiptId: "",
            hasImageData: false
        };
    }

    onImageUpload = (imageData, receiptId) => {
        this.setState({ imageData: imageData, receiptId: receiptId, hasImageData: true })
    }
    onSubmitReceiptForm = () => {
        this.setState({ receiptFormSubmitted: !this.state.receiptFormSubmitted, hasImageData: false, imageData: [] })
    }


    render() {
        return (

            <div>
                <Segment>
                    <UploadReceipt onImageUpload={this.onImageUpload} onSubmitReceiptForm={this.onSubmitReceiptForm} receiptFormSubmitted={this.state.receiptFormSubmitted} />
                    <Divider horizontal>And</Divider>
                    {this.state.imageData.length !== 0 ?
                        <ReceiptDetailsForm imageData={this.state.imageData} onSubmitReceiptForm={this.onSubmitReceiptForm} receiptId={this.state.receiptId} />
                        : null
                    }
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
