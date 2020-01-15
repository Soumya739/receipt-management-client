import React, { Component } from 'react'
import { Button, Form, Dropdown, Segment, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import axios from 'axios';
import AddTextField from './AddTextField'

export class ReceiptDetailsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            store: "",
            total_amount: 0,
            generated_on: "",
            user_id: this.props.current_user.id,
            expense_type: []
        }
    }

    handleFormInput = (e) => {
        this.setState({ ...this.state, [e.target.id]: e.target.value, image: this.props.image })
    }

    onAdditionToExpenseType = (array) => {
        array.map((tag) => {
            console.log(tag)
            this.setState({ expense_type: [...this.state.expense_type, tag] })
        })
    }
    conditionForSubmit = () => {
        let { image, store, total_amount, generated_on, user_id, expense_type } = this.state
        return (
            image === "" ||
            store === "" ||
            total_amount === 0 ||
            generated_on === "" ||
            user_id === "" ||
            expense_type.length === 0
        )
    }
    onResetForm = () => {
        this.setState({
            image: "",
            store: "",
            total_amount: 0,
            generated_on: "",
            user_id: this.props.current_user.id,
            expense_type: []
        })
    }

    handleFormSummissionProcess = (e) => {
        const index = this.state.expense_type.indexOf("other");
        console.log("other index", index)
        if (index > -1) {
            this.state.expense_type.splice(index, 1);
        }
        this.handleFormSubmit(e)
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        formdata.append('image', this.state.image)
        formdata.append('store', this.state.store)
        formdata.append('total_amount', this.state.total_amount)
        formdata.append('generated_on', this.state.generated_on)
        formdata.append('user_id', this.state.user_id)
        formdata.append('expense_type', this.state.expense_type)
        axios({
            method: 'post',
            url: 'http://localhost:3000/receipts',
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            this.setState({
                image: "",
                store: "",
                total_amount: 0,
                generated_on: "",
                user_id: this.props.current_user.id,
                expense_type: []
            })
            this.props.onSubmitReceiptForm()
        })
    }
    onChangeselection = (e, { value }) => {
        this.setState({ ...this.state, expense_type: value })
    }
    onOtherSelection = () => {
        if (this.state.expense_type.includes("other")) {
            return (
                <AddTextField onAdditionToExpenseType={this.onAdditionToExpenseType} />
            )
        }
    }


    options = () => {
        return (
            [
                { key: 'food', text: 'food', value: 'food' },
                { key: 'pharmacy', text: 'pharmacy', value: 'pharmacy' },
                { key: 'furniture', text: 'furniture', value: 'furniture' },
                { key: 'Automotive', text: 'Automotive', value: 'Automotive' },
                { key: 'Electronics', text: 'Electronics', value: 'Electronics' },
                { key: 'Entertainment', text: 'Entertainment', value: 'Entertainment' },
                { key: 'Gifts', text: 'Gifts', value: 'Gifts' },
                { key: 'Health', text: 'Health', value: 'Health' },
                { key: 'Beauty', text: 'Beauty', value: 'Beauty' },
                { key: 'Clothes', text: 'Clothes', value: 'Clothes' },
                { key: 'Restaurants', text: 'Restaurants', value: 'Restaurants' },
                { key: 'other', text: 'other', value: 'other' },
            ]
        )
    }

    render() {
        let { store, total_amount, generated_on } = this.state
        return (
            <Segment>
                <h2 className="centered"><Icon name='compose' />Enter Receipt Details</h2>
                <Form onSubmit={(e) => this.handleFormSummissionProcess(e)}>
                    <Form.Field>
                        <label><Icon name='map marker' />Store:</label>
                        <input placeholder='Store Name' id="store" value={store} onChange={(e) => this.handleFormInput(e)} required />
                    </Form.Field>
                    <Form.Field>
                        <label><Icon name='dollar sign' />Total Amount:</label>
                        <input placeholder='Total Amount' id="total_amount" value={total_amount} onChange={(e) => this.handleFormInput(e)} required />
                    </Form.Field>
                    <Form.Field>
                        <label><Icon name='calendar alternate' />Generated on:</label>
                        <input type="date" placeholder='Date: mm/dd/yyyy' id="generated_on" value={generated_on} onChange={(e) => this.handleFormInput(e)} required />
                    </Form.Field>
                    <Form.Field>
                        <label><Icon name='tags' />Expense Type:</label>
                        <Dropdown deburr={true} allowAdditions={true} placeholder='Expense Type' id="expense_type" fluid multiple selection options={this.options()} onChange={this.onChangeselection} />
                    </Form.Field>
                    {this.onOtherSelection()}
                    <Button.Group>
                        <Button negative type="reset" onclick={this.onResetForm}>Cancel</Button>
                        <Button.Or />
                        {this.conditionForSubmit() ? <Button positive disabled>Submit</Button> : <Button positive type="submit" >Submit</Button>}
                    </Button.Group>
                </Form>
            </Segment>
        )
    }
}

const mapStateToProps = state => {
    return {
        current_user: state.current_user,
    }
}

export default connect(mapStateToProps, null)(ReceiptDetailsForm)
