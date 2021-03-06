import React from "react";

import { makeStyles } from '@material-ui/core/styles';

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import MuseumIcon from '@material-ui/icons/Museum';
import SettingsIcon from '@material-ui/icons/Settings';

import HighlightsCheckbox from "../../components/atoms/HighlightsCheckbox";
import DepartmentSelect from "../../components/atoms/DepartmentSelect";
import SettingsDialog from "../../components/atoms/SettingsDialog";
import AboutDialog from "../../components/atoms/AboutDialog";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },  
  },
  title: {
    flexGrow: 1,
  },
  score: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3),
    },    
  },
}));

export default function GuessAppBar(props) {
  const classes = useStyles();
  const [settingsDialogOpen, setSettingsDialogOpen] = React.useState(false);

  function handleSettingsIconPress() {
    setSettingsDialogOpen(true);
  }

  function handleSettingsDialogClose() {
    setSettingsDialogOpen(false);
  }

  const [aboutDialogOpen, setAboutDialogOpen] = React.useState(false);

  function handleMuseumIconPress() {
    setAboutDialogOpen(true);
  }

  function handleAboutDialogClose() {
    setAboutDialogOpen(false);
  }

  return(
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={handleMuseumIconPress} edge="start" className={classes.iconButton} color="inherit" aria-label="museum">
            <MuseumIcon />
        </IconButton>
        <Typography align="center" variant="h6" className={classes.title}>
          Met Chronoguesser
        </Typography>
        {/* with small screen show settings icon */}
        <Hidden mdUp>
          <IconButton onClick={handleSettingsIconPress} edge="end" color="inherit" aria-label="settings">
              <SettingsIcon />
          </IconButton>          
        </Hidden>
        {/* with larger screen put settings in appbar */}
        <Hidden smDown>
          <Typography variant="overline" align="center" className={classes.score}>
            Round: {props.currentRound}/{props.roundsInGame}
          </Typography>
          <Typography variant="overline" align="center" className={classes.score}>
            Score: {props.score}
          </Typography>
          <HighlightsCheckbox 
            showHighlights={props.showHighlights} 
            setShowHighlights={props.setShowHighlights} 
            setIsLoading={props.setIsLoading}
          />
          <DepartmentSelect
            department={props.department}
            setDepartment={props.setDepartment} 
            setIsLoading={props.setIsLoading}
          />
        </Hidden>
      </Toolbar>
      <AboutDialog 
        open={aboutDialogOpen} 
        handleAboutDialogClose={handleAboutDialogClose} 
      />
      <SettingsDialog 
        open={settingsDialogOpen} 
        handleSettingsDialogClose={handleSettingsDialogClose}
        showHighlights={props.showHighlights} 
        setShowHighlights={props.setShowHighlights} 
        department={props.department}
        setDepartment={props.setDepartment} 
        setIsLoading={props.setIsLoading}
      />
    </AppBar>
  );
}