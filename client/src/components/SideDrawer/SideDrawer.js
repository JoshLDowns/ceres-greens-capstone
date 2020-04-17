import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import React from 'react';
import TempSubMenu from './TempSubMenu'
import './SideDrawer.css'
import HumSubMenu from './HumSubMenu'
import CurrentSubMenu from './CurrentSubMenu'
import PHSubMenu from './pHSubMenu'
import SMSSubMenu from './SMSSubMenu'
import DrawerButton from './DrawerButton'



export default function SideDrawer(props) {
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div className="side-drawer" role="presentation">
            <List onMouseLeave={toggleDrawer(anchor, false)} >   
                        <ExpansionPanel id="side-drawer-items">
                            <ExpansionPanelSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography id="side-drawer-items-content">Temperature Ranges</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                    <TempSubMenu handleSubmit={props.handleSubmit}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel id="side-drawer-items">
                            <ExpansionPanelSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography id="side-drawer-items-content">Humidity Ranges</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                    <HumSubMenu handleSubmit={props.handleSubmit}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel id="side-drawer-items">
                            <ExpansionPanelSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography id="side-drawer-items-content">Electric Current Ranges</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                    <CurrentSubMenu handleSubmit={props.handleSubmit}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel id="side-drawer-items">
                            <ExpansionPanelSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography id="side-drawer-items-content">pH Ranges</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                    <PHSubMenu handleSubmit={props.handleSubmit}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel id="side-drawer-items">
                            <ExpansionPanelSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography id="side-drawer-items-content">Add Phone Number (SMS)</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                    <SMSSubMenu handleSubmit={props.handleSubmit}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
            </List>
        </div>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}><DrawerButton /></Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}