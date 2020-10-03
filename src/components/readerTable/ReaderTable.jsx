import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import EnhancedTable from '../table/EnhancedTable';



/* @Column("varchar", { unique: true, length: 15, primary: true, nullable: false })
    ip: string;

    @Column("varchar", { unique: true, length: 40 })
    doorname: string;

    @Column("bigint", { default: 0, nullable: false })
    lastPing: number
 */


const ReaderTable = () => {
    const [data, setData] = useState(null)
    const [skipPageReset, setSkipPageReset] = useState(false)


    const columns = React.useMemo(
        () => [
            {
                Header: 'Door IP',
                accessor: 'ip',
            },
            {
                Header: 'Reader Name',
                accessor: 'readerName',
            },
            {
                Header: 'Last Ping',
                accessor: row => {
                    const date = new Date(row.lastPing * 1000); // try to create a date from validUntil
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

    useEffect(() => {
        (async () => {
            try {
                const BASEURL = process.env.REACT_APP_BACK_END
                const data = await fetch(BASEURL + "/readers", {
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


    if (!data) return (
        <Box>
            loading
        </Box>
    )
    return (
        <Box>
            <EnhancedTable
                columns={columns}
                data={data}
                deleteDataHandler={deleteDataHandler}
                addDataHandler={addDataHandler}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                tableTitle="Readers"
            />
        </Box>
    )
}

export default ReaderTable
