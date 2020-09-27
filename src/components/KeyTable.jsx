import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import StickyHeadTable from './StickyHeadTable'



/* acctype: 1
acctype2: 0
acctype3: 0
acctype4: 0
id: 5
isOneTimeCode: false
user: "kanaat"
uuid: "1234678"
validuntil: "999999999999999" */

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'user', label: 'User' },
    {
        id: 'uuid',
        label: 'uuid',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'isOneTimeCode',
        label: 'one time code',
        minWidth: 170,
        align: 'right',
        format: (val) => val.toString()
    },
    {
        id: 'validuntil',
        label: 'valid until',
        minWidth: 170,
        align: 'right',
    },

    {
        id: 'acctype',
        label: 'acctype 1',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'acctype2',
        label: 'acctype 2',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'acctype3',
        label: 'acctype 3',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'acctype4',
        label: 'acctype 4',
        minWidth: 170,
        align: 'right',
    },
];



const KeyTable = () => {
    const [keys, setKeys] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const data = await fetch("http://localhost:5000/keys")
                const json = await data.json()
                setKeys(json)
            } catch (error) {
                console.log(error)
            }

        })()
    }, [])

    const sortBy = (field, compareFunction) => {

    }
    console.log(keys)
    if (!keys) return <Box>
        loading
    </Box>
    return (
        <Box>
            <StickyHeadTable
                rows={keys}
                columns={columns}
            />
        </Box>
    )
}

export default KeyTable
