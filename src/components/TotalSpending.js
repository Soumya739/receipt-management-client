import React from 'react';

const TotalSpending = (props) => {
    return (
        <div style={{ textAlign: "right" }}>
            <h2><strong>Total Spending:</strong>  ${props.totalSpending}</h2>
            <br></br>
        </div>
    )
}
export default TotalSpending