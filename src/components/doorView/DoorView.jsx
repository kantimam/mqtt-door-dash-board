import { Box, Button, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'

const DoorView = () => {
    /* displays a single door */
    const [doorIp, setIp] = useState("")
    const [keyId, setId] = useState("")

    const submitLink = async (e) => {
        // links key to your door
        e.preventDefault();
        if (!doorIp || !keyId) return
        try {
            const BASEURL = process.env.REACT_APP_BACK_END
            const response = await fetch(`${BASEURL}/doorkeys`, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    doorIp: doorIp,
                    keyId: keyId,
                    acctype: true,
                    acctype2: true,
                    acctype3: true,
                    acctype4: true
                }),
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            const json = await response.json()
            console.log(json)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Box>
            <Typography>
                scuffed door view
            </Typography>
            <Typography>
                add keys to your door and sync them to the device
            </Typography>
            <form onSubmit={submitLink}>
                <TextField
                    value={doorIp}
                    label="door ip"
                    onChange={(e) => setIp(e.target.value)}
                />
                <TextField
                    value={keyId}
                    label="key id"
                    onChange={(e) => setId(e.target.value)}
                />
                <Button type="submit" variant="contained">
                    submit
                </Button>
            </form>
        </Box>
    )
}

export default DoorView
