import { Box } from '@material-ui/core'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DoorTable from '../components/doorTable/DoorTable'
import KeyTable from '../components/keyTable/KeyTable'
import Nav from '../components/Nav'

const Home = (props) => {
    return (
        <Box>
            <Nav />
            <Switch>
                <Route path="/key">
                    <KeyTable />
                </Route>
                <Route path="/door">
                    <DoorTable />
                </Route>
            </Switch>
        </Box>
    )
}

export default Home
