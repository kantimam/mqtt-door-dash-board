import { Box } from '@material-ui/core'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ReaderTable from '../components/readerTable/ReaderTable'
import DoorView from '../components/doorView/DoorView'
import EventTable from '../components/evenTable/EventTable'
import KeyTable from '../components/keyTable/KeyTable'
import Nav from '../components/Nav'

const Home = (props) => {
    return (
        <Box>
            <Nav />
            <Switch>
                <Route path="/keys">
                    <KeyTable />
                </Route>
                <Route path="/doors">
                    <ReaderTable />
                </Route>
                <Route path="/events">
                    <EventTable />
                </Route>
                <Route path="/link">
                    <DoorView />
                </Route>
            </Switch>
        </Box>
    )
}

export default Home
