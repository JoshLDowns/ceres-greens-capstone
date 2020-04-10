import React from 'react';
import './SideDrawer.css'
function SideDrawer(props) {
    return(
        <nav className="side-drawer">
            <ul>
                <li><a href="/">Temperature Ranges</a></li>
                <li><a href="/">Humidity Ranges</a></li>
                <li><a href="/">Machine Schedules</a></li>
                <li><a href="/">Add Email (SMS)</a></li>
            </ul>
        </nav>
    )
}

export default SideDrawer;