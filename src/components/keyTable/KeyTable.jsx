import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import EnhancedTable from '../table/EnhancedTable';
import AddUserDialog from './AddUserDialog';



/* acctype: 1
acctype2: 0
acctype3: 0
acctype4: 0
id: 5
isOneTimeCode: false
user: "kanaat"
uuid: "1234678"
validuntil: "999999999999999" */

/* const columns = [
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
]; */



const KeyTable = () => {
    const [data, setData] = useState(null)
    const [skipPageReset, setSkipPageReset] = useState(false)


    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'User',
                accessor: 'user',
            },
            {
                Header: 'uuid',
                accessor: 'uuid',
            },
            {
                Header: 'one time code',
                accessor: 'isOneTimeCode',
            },
            {
                Header: 'valid until',
                accessor: 'validuntil',
                Cell: props => {
                    const date = new Date(props.value * 1000).toLocaleString("de")
                    return date
                }
            },
            {
                Header: 'acctype 1',
                accessor: 'acctype',
            },
            {
                Header: 'acctype 2',
                accessor: 'acctype2',
            },
            {
                Header: 'acctype 3',
                accessor: 'acctype3',
            },
            {
                Header: 'acctype 4',
                accessor: 'acctype4',
            },
        ],
        []
    )

    useEffect(() => {
        (async () => {
            try {
                const BASEURL = process.env.REACT_APP_BACK_END
                const data = await fetch(BASEURL + "/keys", {
                    credentials: 'include',
                })
                const json = await data.json()
                setData(json)
            } catch (error) {
                console.log(error)
            }

        })()
    }, [])





    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    const deleteDataHandler = event => {
        const newData = null
        setData(newData)
    }

    const addDataHandler = user => {
        const newData = data.concat([user])
        setData(newData)
    }


    console.log(data)
    if (!data) return <Box>
        loading
    </Box>
    return (
        <Box>
            {/* <StickyHeadTable
                rows={data}
                columns={columns}
            /> */}
            <EnhancedTable
                columns={columns}
                data={data}
                deleteDataHandler={deleteDataHandler}
                addDataHandler={addDataHandler}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                AddUserDialogComponent={AddUserDialog}
                tableTitle="Keys"
            />
        </Box>
    )
}

export default KeyTable
