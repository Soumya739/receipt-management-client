import React, { Component } from 'react'
import { connect } from 'react-redux';
import DisplayReceipt from '../components/DisplayReceipt';
import { api } from '../services/api';
import { Segment } from 'semantic-ui-react'
import { Button, Icon } from 'semantic-ui-react'
import { Card } from 'semantic-ui-react'
// import { editReceipts } from '../actions/receipts';


export class Photo extends Component {
    constructor() {
        super();
        this.state = {
            receipts: []
        }
    }

    handleGetReceipts = () => {
        api.receipt.GetUserReceipts()
            .then(receipts => {
                this.setState({ receipts: receipts })
                // this.props.editReceipts(receipts)
            })
    }

    displayAllReceipts = () => {
        return (
            <Card.Group itemsPerRow={4} stackable={true} centered={true}>
                {this.state.receipts.map(receipt => (<DisplayReceipt receipt={receipt} key={receipt.id} handleGetReceipts={this.handleGetReceipts} />))}
            </Card.Group>
        )
    }

    render() {
        if (this.state.receipts.length !== 0) {
            return (
                <div id="photos">
                    {this.displayAllReceipts()}
                </div>
            )
        } else {
            return (
                <Segment id="photo-button">
                    <Button onClick={this.handleGetReceipts} size={"large"}><Icon name='images' />Click here to see Receipts</Button>
                </Segment>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        current_user: state.current_user,
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         editReceipts: (receipts) => dispatch(editReceipts(receipts)),
//     }
// }


export default connect(mapStateToProps, null)(Photo)
