import React, { Component } from 'react'
import { connect } from 'react-redux';
import DisplayReceipt from '../components/DisplayReceipt';
import { api } from '../services/api';

export class Photo extends Component {
    constructor() {
        super();
        this.state = {
            receipts: []
        }
    }

    handleGetReceipts = () => {
        api.receipt.GetUserReceipts(this.props.current_user.id)
            .then(receipts => {
                receipts.map(receipt => (
                    this.setState({ receipts: [...this.state.receipts, { id: receipt.id, url: receipt.image.url }] })
                ))
            })
    }

    displayAllReceipts = () => {
        return this.state.receipts.map(receipt => (<DisplayReceipt url={receipt.url} key={receipt.id} />))
    }

    render() {
        return (
            <div>
                <button onClick={this.handleGetReceipts}>Show Receipts</button>
                <div>
                    {this.displayAllReceipts()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        current_user: state.current_user,
    }
}

export default connect(mapStateToProps, null)(Photo)
