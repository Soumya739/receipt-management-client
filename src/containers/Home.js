import React, { Component } from 'react'
import ExpenseGraph from './ExpenseGraph'
import UploadReceipt from './UploadReceipt'
import ReceiptDetailsForm from './ReceiptDetailsForm'
import { Segment, Divider, Header, Icon, Dimmer, Loader } from 'semantic-ui-react'
import { api } from '../services/api'

export class Home extends Component {
    constructor() {
        super();
        this.state = {
            imageData: [],
            receiptFormSubmitted: false,
            receiptId: "",
            hasImageData: false,
            graphData: {},
            loadingImageContents: false
        };
    }

    componentDidMount() {
        api.receipt.get_amount_per_type()
            .then(res => {
                this.setState({ graphData: res })
            })
    }

    onImageUpload = (imageData, receiptId) => {
        this.onSetLoaderStatus()
        this.setState({ imageData: imageData, receiptId: receiptId, hasImageData: true })
    }
    onSubmitReceiptForm = () => {
        this.setState({ receiptFormSubmitted: !this.state.receiptFormSubmitted, hasImageData: false, imageData: [] })
    }

    onSetLoaderStatus = () => {
        this.setState({ loadingImageContents: !this.state.loadingImageContents })
    }

    render() {
        return (
            <div >
                <Segment id="home">
                    <Dimmer active={this.state.loadingImageContents}>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                    <br></br>
                    <UploadReceipt onImageUpload={this.onImageUpload} onSubmitReceiptForm={this.onSubmitReceiptForm} receiptFormSubmitted={this.state.receiptFormSubmitted} onSetLoaderStatus={this.onSetLoaderStatus} />
                    <br></br>
                    {this.state.imageData.length !== 0 ?
                        <>
                            <Divider horizontal>And</Divider>
                            <ReceiptDetailsForm imageData={this.state.imageData} onSubmitReceiptForm={this.onSubmitReceiptForm} receiptId={this.state.receiptId} />
                        </>
                        : null
                    }
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='bar chart' />
                            Chart
                    </Header>
                    </Divider>
                    <br></br>
                    <ExpenseGraph graphData={this.state.graphData} hasImageData={this.state.hasImageData} />
                </Segment>
            </div>
        )
    }
}

export default Home
