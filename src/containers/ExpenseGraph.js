import React, { Component } from 'react'
import CanvasJSReact from '../canvasjs.react'
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class ExpenseGraph extends Component {
    constructor() {
        super()
        this.state = {
            options: {
                title: {
                    text: 'Expenses Distibution Chart'
                },
                data: [
                    {
                        type: "column",
                        dataPoints: [
                            { label: "Expense-1", y: 10 },
                            { label: "Expense-1", y: 20 },
                            { label: "Expense-1", y: 30 },
                            { label: "Expense-1", y: 10 },
                            { label: "Expense-1", y: 15 },
                            { label: "Expense-1", y: 25 },
                            { label: "Expense-1", y: 10 }
                        ]
                    }
                ]
            }
        }
    }
    expenseGraphData = () => {
        let total = 0
        let keysValues = Object.values(this.props.graphData)
        keysValues.map(amt => total = total + amt)
        let keys = Object.keys(this.props.graphData)
        return keys.map(expenseType => {
            return { label: expenseType + ` ${Math.round(100 * (this.props.graphData[expenseType]) / total)}%`, y: this.props.graphData[expenseType] };
        })
    }

    render() {
        const options = {
            title: {
                text: 'Expenses Distibution Chart'
            },
            data: [
                {
                    type: "column",
                    dataPoints: this.expenseGraphData()
                }
            ]
        };
        if (Object.keys(this.props.graphData).length !== 0) {
            return (
                <div style={{ height: "500px", width: "90%", margin: "auto" }}>
                    <CanvasJSChart
                        options={options}
                        onRef={ref => this.chart = ref}
                    />
                </div>
            )
        } else {
            return (
                <div style={{ height: "500px", width: "90%", margin: "auto" }}>
                    <CanvasJSChart
                        options={this.state.options}
                        onRef={ref => this.chart = ref}
                    />
                </div>
            )
        }

    }
}

export default ExpenseGraph
