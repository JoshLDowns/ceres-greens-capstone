import React from 'react';
import './DrawerButton.css';


function DrawerButton(props) {
    return(
        <div>
        <button className="drawer-button">
            <div className="button-line"/>
            <div className="button-line"/>
            <div className="button-line"/>
        </button>
        </div>
    )
}

export default DrawerButton;