import React, { Component } from 'react'
import ExpenseGraph from './ExpenseGraph'
import UploadReceipt from './UploadReceipt'
import ReceiptDetailsForm from './ReceiptDetailsForm'

export class Home extends Component {
    constructor() {
        super();
        this.state = {
            image: "",
        };
    }

    onImageUpload = (data) => {
        this.setState({ image: data })
    }

    render() {
        return (
            <div>
                <UploadReceipt onImageUpload={this.onImageUpload} />
                <ReceiptDetailsForm image={this.state.image} />
                <ExpenseGraph />
            </div>
        )
    }
}

export default Home
