import React, { Component } from 'react'
import CanvasJSReact from '../canvasjs.react'
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class ExpenseGraph extends Component {
    expenseGraphData = () => {
        console.log(this.props.graphData)
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

        return (
            <div style={{ height: "500px", width: "80%", margin: "auto" }}>
                <CanvasJSChart
                    options={options}
                    onRef={ref => this.chart = ref}
                />
            </div>
        )
    }
}

export default ExpenseGraph
