import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import EnhancedTable from '../table/EnhancedTable';
import AddUserDialog from './AddUserDialog';




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
                accessor: row => {
                    const date = new Date(row.validUntil * 1000); // try to create a date from validUntil
                    if (isNaN(date.getTime())) {
                        return 0
                    }
                    return date.getTime()
                },
                Cell: props => new Date(props.value).toLocaleString("de") || "invalid date",

            },

        ],
        []
    )

    const getAllKeys = async () => {
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
    }

    useEffect(() => {
        getAllKeys()
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

    const addDataHandler = async (user) => {
        try {
            console.log(user)
            const BASEURL = process.env.REACT_APP_BACK_END
            const response = await fetch(BASEURL + "/key", {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) throw Error("invalid response")
            const json = await response.json()
            //if (!(json.id && json.user && json.uuid && json.validUntil)) throw "invalid json"
            //console.log(json)
            const newData = data.concat([json])
            setData(newData)
        } catch (error) {
            console.log(error)
        }

    }


    console.log(data)
    if (!data) return <Box>
        loading
    </Box>
    return (
        <Box>

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
