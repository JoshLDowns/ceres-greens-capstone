import React from 'react'

class UserData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //state stuff!
        }
    }

    render () {
        return (
            <div id='user'>
                <h1>I'm some data the user can query!</h1>
            </div>
        )
    }
}

export default UserData