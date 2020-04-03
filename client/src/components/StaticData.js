import React from 'react'

class StaticData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //state stuff!
        }
    }

    render () {
        return (
            <div id='static'>
                <h1>I'm some static data!</h1>
            </div>
        )
    }
}
 
export default StaticData