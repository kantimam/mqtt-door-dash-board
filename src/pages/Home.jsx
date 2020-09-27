import { Box } from '@material-ui/core'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import KeyTable from '../components/KeyTable'
import Nav from '../components/Nav'

const Home = (props) => {
    console.log(props)
    return (
        <Box>
            <Nav />
            <Switch>
                <Route path="/key">
                    <KeyTable />
                </Route>
            </Switch>
        </Box>
    )
}

export default Home
