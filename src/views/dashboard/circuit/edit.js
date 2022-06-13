/* eslint-disable */
import { useState, useCallback, useEffect, Fragment } from "react"
import { Card } from "react-bootstrap"
import { useParams, useHistory } from "react-router-dom"
import { CircuitForm } from "../../components/form/circuit"
import { NoContent } from "../../components/204"
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

const Edit = () => {
    const { id } = useParams()
    const history = useHistory()
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isUpdating, setUpdating] = useState(false)
    const [serverError, setServerError] = useState(false)

    /* fetch data */
    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await Circuit.Show(id)
            if (response.status === 200 && response.data && response.data.data && response.data.data.result) {
                setData(response.data.data.result)
                setLoading(false)
            } else {
                setLoading(false)
                setServerError(true)
            }
        } catch (error) {
            if (error) {
                setLoading(false)
                setServerError(true)
                if (error.response && error.response.data && error.response.data.errors) {
                    console.log(error.response.data.errors.message)
                }
            }
        }
    }, [id])

    useEffect(() => {
        fetchData()
    }, [id, fetchData])

    /* Handle submit */
    const handleSubmit = async (data) => {
        try {
            setUpdating(true)
            const response = await Circuit.Update(id, data)
            if (response.status === 200) {
                // Toastify.Success(response.data.data.message)
                toast.success(<SuccessContent msg={response.data.data.message} />, {
                    transition: Slide,
                    hideProgressBar: true,
                    autoClose: 2000
                })
                history.push("/pages/circuit?admin=schoolAdmin")
            }

            setUpdating(false)
        } catch (error) {
            if (error) {
                setUpdating(false)
                toast.error(<ErrorContent msg={'Something going wrong.'} />, {
                    transition: Slide,
                    hideProgressBar: true,
                    autoClose: 2000
                })
                // Toastify.Error("Something going wrong.")
            }
        }
    }

    return (
        <Card className="bg-white shadow-none" style={{ marginTop: "50px" }}>
            <Card.Header>
                <h5>Edit circuit</h5>
            </Card.Header>
            <Card.Body>
                {isLoading && !serverError && !data ? <p>Loading...</p> : null}
                {!isLoading && serverError && !data ? <NoContent message="Something going wrong." /> : null}

                {!isLoading && !serverError && data ?
                    <CircuitForm
                        data={data}
                        loading={isUpdating}
                        onSubmit={data => handleSubmit(data)}
                    />
                    : null
                }
            </Card.Body>
        </Card>
    )
}

export default Edit