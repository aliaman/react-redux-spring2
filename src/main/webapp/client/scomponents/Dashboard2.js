import React from 'react'
import Authorization from './../utils/Authorization'

class Dashboard2 extends React.Component {
    render() {
        return (
            <div>
                <h3>Dashboard2</h3>
            </div>
        )
    }
}
export default Authorization(Dashboard2, ['MANAGER'])