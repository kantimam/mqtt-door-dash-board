import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../App';
import { localStorageUserKey } from '../services/helpers';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolBarSpacing: {

        "& a+a": {
            margin: theme.spacing(0, 0, 0, 6)
        },
        flexWrap: "wrap"
    }
}));

export default function Nav() {
    const { dispatch } = useContext(UserContext)
    const classes = useStyles();

    const logOut = () => {
        // do the fetch thingy
        localStorage.removeItem(localStorageUserKey())
        dispatch({
            type: "logOut"
        })
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolBarSpacing} variant="dense">
                    <Link color="inherit" component={RouterLink} to="/">
                        <Typography variant="h6" color="inherit">
                            Home
                        </Typography>
                    </Link>
                    <Link color="inherit" component={RouterLink} to="/keys">
                        keys
                    </Link>
                    <Link color="inherit" component={RouterLink} to="/doors">
                        doors
                    </Link>
                    <Link color="inherit" component={RouterLink} to="/access">
                        access
                    </Link>
                    <Link color="inherit" component={RouterLink} to="/events">
                        events
                    </Link>
                    <Box marginLeft="auto">
                        <Button onClick={logOut} variant="contained" color="secondary">
                            log out
                        </Button>
                    </Box>

                </Toolbar>
            </AppBar>
        </div>
    );
}