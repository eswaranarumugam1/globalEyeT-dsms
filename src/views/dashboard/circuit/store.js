/* eslint-disable */
import { useState, Fragment } from "react"
import { Card } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { CircuitForm } from "../../components/form/circuit"
import { toast, Slide } from "react-toastify"
import { Circuit } from "../../../services/home/circuit"
import { Coffee } from "react-feather"
import Avatar from "@components/avatar"

const SuccessContent = ({ msg }) => (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
          <h6 className="toast-title font-weight-bold">Success</h6>
        </div>
      </div>
      <div className="toastify-body">
        <span>
          {msg}
        </span>
      </div>
    </Fragment>
)

const ErrorContent = ({ msg }) => (
<Fragment>
    <div className="toastify-header">
    <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">Error in the form</h6>
    </div>
    </div>
    <div className="toastify-body">
    <span>
        {msg}
    </span>
    </div>
</Fragment>
)

const Store = () => {
    const history = useHistory()
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await Circuit.Store(data)
            if (response.status === 200) {
                // Toastify.Success(response.data.data.message)
                toast.success(<SuccessContent msg={response.data.data.message} />, {
                    transition: Slide,
                    hideProgressBar: true,
                    autoClose: 2000
                })
                history.push("/pages/circuit?admin=schoolAdmin")
            }

            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                // Toastify.Error("Something going wrong.")
                toast.error(<ErrorContent msg={'Something going wrong.'} />, {
                    transition: Slide,
                    hideProgressBar: true,
                    autoClose: 2000
                })
            }
        }
    }

    return (
        <Card className="bg-white shadow-none">
            <Card.Header>
                <h5>Add circuit</h5>
            </Card.Header>
            <Card.Body>
                <CircuitForm
                    loading={isLoading}
                    onSubmit={data => handleSubmit(data)}
                />
            </Card.Body>
        </Card>
    )
}

export default Store