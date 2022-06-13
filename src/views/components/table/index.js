
/* eslint-disable */
import { NoContent } from "../204"
import { SearchComponent } from "./search"
import ReactDataTable from "react-data-table-component"

export const DataTable = (props) => {
    const styles = {
        headRow: {
            style: {
                backgroundColor: "#f1f0f5",
                minHeight: '56px',
                paddingLeft: '16px',
                paddingRight: '8px'
            }
        },
        headCells: {
            style: {
                color: "#6f6c7c",
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase'
            }
        },
        rows: {
            style: {
                fontSize: '15px',
                fontWeight: 600,
                color: '#898794',
                minHeight: '60px'
            },
            stripedStyle: {
                color: '#898794'
            }
        },
        pagination: {
            style: {
                fontSize: '13px',
                minHeight: '56px'
            }
        }
    }
    return (
        <ReactDataTable
            striped={true}
            columns={props.columns}
            data={props.data}
            progressPending={props.loading}
            progressComponent={"Loading..."}
            customStyles={styles}
            noDataComponent={< NoContent message={props.noDataMessage || "No content available."} />}
            pagination
            paginationServer
            paginationTotalRows={props.totalRows}
            onChangeRowsPerPage={props.handlePerRowsChange}
            onChangePage={props.handlePageChange}
            subHeader={props.searchable}
            subHeaderComponent={
                <SearchComponent
                    placeholder={props.placeholder}
                    searchLoading={props.searchLoading}
                    search={query => props.search(query)}
                    clear={() => props.clearSearch()}
                />
            }
        />
    )
}
