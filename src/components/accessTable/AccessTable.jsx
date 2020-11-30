import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import EnhancedTable from '../table/EnhancedTable';




const AccessTable = () => {
    const [data, setData] = useState(null)
    const [skipPageReset, setSkipPageReset] = useState(false)


    const columns = React.useMemo(
        () => [
            {
                Header: 'Access type',
                accessor: 'type',
            },
            {
                Header: 'Door',
                accessor: 'door',
            },
            {
                Header: 'UID',
                accessor: 'uid',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'is known',
                accessor: 'isKnown',
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: props => {
                    const date = new Date(props.value * 1000).toLocaleString("de")
                    return date
                }
            }
        ],
        []
    )

    useEffect(() => {
        (async () => {
            try {
                const BASEURL = process.env.REACT_APP_BACK_END
                const data = await fetch(BASEURL + "/access", {
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
            <EnhancedTable
                columns={columns}
                data={data}
                deleteDataHandler={deleteDataHandler}
                addDataHandler={addDataHandler}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                tableTitle="Keys"
            />
        </Box>
    )
}

export default AccessTable
