import React from 'react';

const TotalSpending = (props) => {
    return (
        <div style={{ textAlign: "right", marginRight: "30px" }}>
            <h2><strong>Total Spending:  <u>${props.totalSpending}</u> </strong></h2>
            <br></br>
        </div>
    )
}
export default TotalSpending