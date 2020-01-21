import React, { Component } from 'react'
import ExpenseGraph from './ExpenseGraph'
import UploadReceipt from './UploadReceipt'
import ReceiptDetailsForm from './ReceiptDetailsForm'
import { Segment, Divider, Header, Icon } from 'semantic-ui-react'
import { api } from '../services/api'

export class Home extends Component {
    constructor() {
        super();
        this.state = {
            imageData: [],
            receiptFormSubmitted: false,
            receiptId: "",
            hasImageData: false,
            graphData: {}
        };
    }

    componentDidMount() {
        api.receipt.get_amount_per_type()
            .then(res => {
                console.log("here", res)
                this.setState({ graphData: res })
            })
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

                    {this.state.imageData.length !== 0 ?
                        <>
                            <Divider horizontal>And</Divider>
                            <ReceiptDetailsForm imageData={this.state.imageData} onSubmitReceiptForm={this.onSubmitReceiptForm} receiptId={this.state.receiptId} />
                        </>
                        : null
                    }
                </Segment>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='bar chart' />
                        Chart
                    </Header>
                </Divider>
                {Object.keys(this.state.graphData).length !== 0 ?
                    <ExpenseGraph graphData={this.state.graphData} />
                    : null
                }
            </div>
        )
    }
}

export default Home
