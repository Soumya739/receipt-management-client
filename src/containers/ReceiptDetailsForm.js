import React, { Component } from 'react'
import { Button, Form, Dropdown, Segment, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import AddTextField from './AddTextField'
import moment from 'moment'
import { api } from "../services/api"

export class ReceiptDetailsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageData: [],
            store: "",
            total_amount: 0,
            generated_on: "",
            expense_type: [],
            options: [],
            receiptId: "",
        }
    }

    componentDidMount() {
        let amountsAfterTotalinReceipt = []
        return api.expenseType.getAllExpenseType()
            .then(resp => {
                let newArray = resp.map(aa => ({ "key": aa.category, "text": aa.category, "value": aa.category }))
                newArray.push({ "key": "other", "text": "other", "value": "other" })
                return newArray
            })
            .then((newArray) => {
                this.setState({
                    options: newArray,
                    imageData: this.props.imageData,
                    store: this.props.imageData[0].text + this.props.imageData[1].text,
                    receiptId: this.props.receiptId
                })
                // console.log(this.props.imageData)
            })
            .then(() => {
                let totalIndex = this.state.imageData.indexOf(this.state.imageData.find(
                    (data, index) =>
                        data.text === "TOTAL" ||
                        data.text === "Total" ||
                        data.text === "total" ||
                        data.text === "GRAND TOTAL" ||
                        data.text === "Total Sale"
                ))
                let startPoint = 1 + totalIndex
                let stopPoint = 3 + totalIndex
                for (let i = startPoint; i < stopPoint; i++) {
                    // console.log("inside for loop! here's the thing: ", this.state.imageData[i].text)
                    if (this.state.imageData[i].text.includes("$")) {
                        // console.log("evald to true for dollar sign")
                        amountsAfterTotalinReceipt.push(this.state.imageData[i].text)
                    } else if (!isNaN(parseFloat(this.state.imageData[i].text))) {
                        // console.log("NaN when parsing float", parseFloat(this.state.imageData[i].text))
                        amountsAfterTotalinReceipt.push((parseFloat(this.state.imageData[i].text)).toString())
                    }
                    else {
                        // console.log("inside the final else condition: ", this.state.imageData[i].text)
                    }
                }
                this.setState({
                    store: this.props.imageData[0].text + " " + this.props.imageData[1].text
                })
                return totalIndex
            })
            .then(() => {
                console.log("amountsAfterTotalinReceipt", amountsAfterTotalinReceipt)
                let amounts = amountsAfterTotalinReceipt.map(amt => parseFloat(amt.replace("$", "")))
                amounts.sort((a, b) => a - b)
                this.setState({ total_amount: amounts[amounts.length - 1] })
            })
    }

    onAdditionToExpenseType = (array) => {
        array.map((tag) => this.setState({ expense_type: [...this.state.expense_type, tag] }))
    }

    handleFormInput = (e) => {
        this.setState({ ...this.state, [e.target.id]: e.target.value })
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

    onResetForm = () => {
        this.setState({
            imageData: [],
            store: "",
            total_amount: 0,
            generated_on: "",
            expense_type: [],
            options: [],
            receiptId: ""
        })
    }

    handleFormSummissionProcess = (e) => {
        const index = this.state.expense_type.indexOf("other");
        if (index > -1) {
            this.state.expense_type.splice(index, 1);
        }
        this.handleFormSubmit(e)
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        api.receipt.updateReceipt(this.state)
            .then(res => {
                this.setState({
                    imageData: [],
                    store: "",
                    total_amount: 0,
                    generated_on: "",
                    expense_type: [],
                    receiptId: ""
                })
                this.props.onSubmitReceiptForm()
            })
    }

    conditionForSubmit = () => {
        let { imageData, store, total_amount, generated_on, user_id, expense_type } = this.state
        return (
            imageData === [] ||
            store === "" ||
            total_amount === 0 ||
            generated_on === "" ||
            user_id === "" ||
            expense_type.length === 0
        )
    }

    render() {
        let { store, total_amount, generated_on } = this.state
        let maxDate = moment().format("YYYY-MM-DD")
        return (
            <Segment>
                <h2 className="centered"><Icon name='compose' />Enter Receipt Details</h2>
                <Form onSubmit={(e) => this.handleFormSummissionProcess(e)}>
                    <Form.Field>
                        <label><Icon name='map marker' />Store:</label>
                        <input placeholder='Store Name' id="store" value={store} onChange={(e) => this.handleFormInput(e)} required style={{ width: "90%" }} />
                    </Form.Field>
                    <Form.Field>
                        <label><Icon name='dollar sign' />Total Amount:</label>
                        <input placeholder='Total Amount' id="total_amount" value={total_amount} onChange={(e) => this.handleFormInput(e)} required style={{ width: "50%" }} />
                    </Form.Field>
                    <Form.Field>
                        <label><Icon name='calendar alternate' />Generated on:</label>
                        <input type="date" max={maxDate} placeholder='Date: mm/dd/yyyy' id="generated_on" value={generated_on} onChange={(e) => this.handleFormInput(e)} required style={{ width: "50%" }} />
                    </Form.Field>
                    <Form.Field>
                        <label><Icon name='tags' />Expense Type:</label>
                        <Dropdown placeholder='Expense Type' id="expense_type" fluid multiple selection options={this.state.options} onChange={this.onChangeselection} value={this.state.expense_type} style={{ width: "90%" }} />
                    </Form.Field>
                    {this.onOtherSelection()}
                    <Button.Group>
                        <Button negative type="reset" onClick={this.onResetForm}>Cancel</Button>
                        <Button.Or />
                        {this.conditionForSubmit() ? <Button positive disabled>Submit</Button> : <Button positive type="submit" >Submit</Button>}
                    </Button.Group>
                </Form>
            </Segment>
        )
    }
}

export default connect(null, null)(ReceiptDetailsForm)
