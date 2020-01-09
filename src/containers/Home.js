import React, { Component } from 'react'
import ExpenseGraph from './ExpenseGraph'

export class Home extends Component {
    render() {
        return (
            <div>
                <button>Upload</button>
                <ExpenseGraph />
            </div>
        )
    }
}

export default Home
