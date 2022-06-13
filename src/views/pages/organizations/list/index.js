// ** Organization List Component
import { useState, useEffect, useCallback } from "react"
import { MoreVertical, Edit, Trash } from 'react-feather'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { DeleteConfirmationModal } from '../../../components/modal/delete-confirmation'
import { OrganizationService } from "../../../../services/home/organization"
import { useHistory } from 'react-router-dom'
import OrgTable from "./OrgTable"

const OrganizationList = () => {
  const [isDelete, setDelete] = useState({ value: null, show: false, loading: false })

 
  const handleDelete = async () => {
    setDelete({ ...isDelete, loading: true })

    await OrganizationService.Delete(isDelete.value)
    fetchData()
    setDelete({ ...isDelete, show: false, loading: false })
  }

  return (
    <div className='app-user-list'>
      <OrgTable />

      {/* Delete confirmation */}
      <DeleteConfirmationModal
        show={isDelete.show}
        loading={isDelete.loading}
        message={"Want to delete ?"}
        onHide={() => setDelete({ value: null, show: false, loading: false })}
        doDelete={handleDelete}
      />
    </div>
  )
}

export default OrganizationList
