import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from 'react-mdl'
import DrawerButton from './SideDrawer/DrawerButton.js'






const HomeHeader = (props) => {
    return (
        <div className="home-header">
            <DrawerButton click={props.drawerClickHandler}/>
        <div className="links">
            <Link to={"/"}>
                <button id="home-button">Home</button>
            </Link>
            <Link to={'/StaticData'}>
                <button id="static-button">Static Data</button>
            </Link>
        
            <Link to={'/UserData'}>
                <button id="user-button">User Data</button>
            </Link>
            </div>
        </div>
    )
}

export default HomeHeader