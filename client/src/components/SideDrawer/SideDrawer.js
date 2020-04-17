import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
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




export default function SideDrawer(props) {
    const [state, setState] = React.useState({
        left: false,
    });

    let toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: open });
    };

    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    
    

    const list = (anchor) => (
        <div className="side-drawer" role="presentation">
            <List >
                <ExpansionPanel id="side-drawer-items" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography id="side-drawer-items-content">Temperature Ranges</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails disabled="false">
                        <TempSubMenu />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel id="side-drawer-items" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography id="side-drawer-items-content">Humidity Ranges</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails disabled="false">
                        <HumSubMenu />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel id="side-drawer-items" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography id="side-drawer-items-content">Electric Current Ranges</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails disabled="false">
                        <CurrentSubMenu />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel id="side-drawer-items" expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography id="side-drawer-items-content">pH Ranges</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails disabled="false">
                        <PHSubMenu />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel id="side-drawer-items" expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography id="side-drawer-items-content">Add Phone Number (SMS)</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails disabled="false">
                        <SMSSubMenu />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </List>
        </div>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <div className="button-line" />
                        <div className="button-line" />
                        <div className="button-line" />
                    </Button>
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