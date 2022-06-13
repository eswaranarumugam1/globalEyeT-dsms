import { Modal } from 'react-bootstrap'
import { X } from 'react-feather'

export const DeleteConfirmationModal = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            centered
            className="custom-modal"
        >
            <Modal.Header className='bg-white'>
                <div className="d-flex w-100">
                    <div className="ml-auto">
                        <button
                            onClick={props.onHide}
                            className="btn-muted text-danger rounded-circle border-0"
                            style={{ padding: "7px 10px" }}
                        ><X size={18} />
                        </button>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center'>
                <h6 className="mb-0">Are tou sure? {props.message}</h6>
                

                <div className="py-4">
                    <button
                        disabled={props.loading}
                        className="btn-danger rounded border-0 mr-2"
                        style={{ padding: "7px 20px", fontSize: 14 }}
                        onClick={props.doDelete}
                    >{props.loading ? "Deleting ..." : "Yes"}
                    </button>

                    <button
                        style={{ padding: "7px 20px", fontSize: 14 }}
                        className="btn-gray rounded border-0 mr-2"
                        onClick={props.onHide}
                    >No</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
