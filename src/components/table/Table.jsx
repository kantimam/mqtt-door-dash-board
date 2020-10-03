import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import EnhancedTable from './EnhancedTable';
/* import AddUserDialog from './AddUserDialog'; */






const Table = ({
    columns = [],
    resourcePath = "",
    canAdd = false
}) => {
    const [data, setData] = useState(null)
    const [skipPageReset, setSkipPageReset] = useState(false)



    const getAllKeys = async () => {
        try {
            const BASEURL = process.env.REACT_APP_BACK_END
            const data = await fetch(`${BASEURL}/${resourcePath}`, {
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
            const response = await fetch(`${BASEURL}/${resourcePath}`, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) throw "invalid response"
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
                addDataHandler={canAdd ? addDataHandler : null}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                AddUserDialogComponent={AddUserDialog}
                tableTitle="Keys"
            />
        </Box>
    )
}

export default KeyTable
