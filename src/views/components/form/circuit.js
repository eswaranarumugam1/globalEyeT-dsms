/* eslint-disable */
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    AvForm,
    AvGroup,
    AvField,
    AvInput,
    AvRadioGroup,
    AvRadio
} from 'availity-reactstrap-validation-safe'
import { Label, Button, Row, Col } from 'reactstrap'

export const CircuitForm = (props) => {
    const [formData, setFormData] = useState({})
    const history = useHistory()

    useEffect(() => {
        setFormData({circute_activation: 1})
        if (props.data) {
            setFormData({
                name: props.data.name,
                type: props.data.type,
                avability: props.data.avability,
                max_capacity: props.data.max_capacity,
                legal_capacity: props.data.legal_capacity,
                no_of_vehicles: props.data.no_of_vehicles,
                status: props.data.status
                // circute_activation: props.data.circute_activation
            })
        }
    }, [])

    // const handleValidSubmit = () => props.onSubmit(formData)
    const onFormSubmit = (event, errors, values) => {
        if (errors.length === 0) {
            props.onSubmit(values)
        }
    }

    const handleCancel = (id) => {
        history.push(`/pages/circuit`)
    }

    const validation = {
        name: {
            required: {value: true, errorMessage: 'Circuit name is required'},
            pattern: {value: '^[a-zA-Z0-9\\s]{1,24}$', errorMessage: 'Invalid name'}
        },
        max_capacity: {
            required: {value: true, errorMessage: 'Circuit capacity is required'},
            // maxLength: {value: 4, errorMessage: 'Circuit capacity must be within 4 digits'}
            pattern: {value: '^[0-9]{1,4}$', errorMessage: 'Circuit max capacity must be within 4 digits'}
        },
        legal_capacity: {
            required: {value: true, errorMessage: 'Legal capacity is required'},
            // maxLength: {value: 4, errorMessage: 'Legal capacity must be within 4 digits'}
            pattern: {value: '^[0-9]{1,4}$', errorMessage: 'Legal capacity must be within 4 digits'}
        }
        // circute_activation: {
        //     required: {value: true, errorMessage: 'Circuit activation is required'}
        // }
    }

    return (
        <div>
            {/* <AvForm onValidSubmit={handleValidSubmit}> */}
            <AvForm onSubmit={onFormSubmit}>
                <Row>

                    {/* Circuit Function */}
                    <Col sm='6' className="mb-2">
                        <AvGroup>
                            <Label for='type'>Circuit Function</Label>
                            <AvField
                                type='select'
                                name='type'
                                id='type'
                                defaultValue={props.data ? props.data.type : null}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    type: e.target.value
                                })}
                                required
                            >
                                <option value={null} hidden={true}>Select function</option>
                                <option value={"practical"}>Practical Training</option>
                                <option value={"theoretical"}>Theoretical Training</option>
                                <option value={"others"}>Others Training</option>
                            </AvField>
                        </AvGroup>
                    </Col>
                   
                    {/* Availability */}
                    <Col sm='6' className="mb-2">
                        <AvGroup>
                            <Label for='avability'>Availability</Label>
                            <AvField
                                type='select'
                                name='avability'
                                id='avability'
                                defaultValue={props.data ? props.data.avability : null}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    avability: e.target.value
                                })}
                                required
                            >
                                <option value={null} hidden={true}>Select gender</option>
                                <option value={"men"}>Men</option>
                                <option value={"women"}>Women</option>
                                <option value={"others"}>Others</option>
                            </AvField>
                        </AvGroup>
                    </Col>

                    {/* Circuit Name */}
                    <Col sm='6' className="mb-2">
                        <AvGroup>
                            <Label for='name'>Circuit Name</Label>
                            <AvField
                                type='text'
                                name='name'
                                id='name'
                                defaultValue={props.data ? props.data.name : null}
                                placeholder="Enter name"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    name: e.target.value
                                })}
                                validate={validation.name}
                            />
                        </AvGroup>
                    </Col>

                    {/* Circuit capacity */}
                    <Col sm='6' className="mb-2">
                        <AvGroup>
                            <Label for='max_capacity'>Circuit capacity</Label>
                            <AvField
                                type='number'
                                name='max_capacity'
                                id='max_capacity'
                                placeholder="Enter max capacity"
                                defaultValue={props.data ? props.data.max_capacity : null}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    max_capacity: e.target.value
                                })}
                                validate={validation.max_capacity}
                            />
                        </AvGroup>
                    </Col>

                    {/* <Col sm='6' className="mb-2">
                        <AvRadioGroup inline name="circute_activation" value={formData.circute_activation}
                            onChange={(e) => setFormData({
                                ...formData,
                                circute_activation: e.target.value
                            })} 
                            validate={validation.circute_activation}>
                            <Label for='circute_activation' className="mb-1">Circuite Activation</Label> <br></br>
                            <AvRadio label="Active" value={1} />
                            <AvRadio label="Deactive" value={0} />
                        </AvRadioGroup>
                    </Col> */}

                    {/* No of Vehicles */}
                    <Col sm='6' className="mb-2">
                        <AvGroup>
                            <Label for='no_of_vehicles'>No of Vehicles</Label>
                            <AvInput
                                type='number'
                                name='no_of_vehicles'
                                id='no_of_vehicles'
                                placeholder="Enter total vehicle"
                                defaultValue={props.data ? props.data.no_of_vehicles : null}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    no_of_vehicles: e.target.value
                                })}
                                required
                            />
                        </AvGroup>
                    </Col>

                    {/* Circuit Status */}
                    <Col sm='6' className="mb-2">
                        <AvGroup>
                            <Label for='status'>Circuit Status</Label>
                            <AvField
                                type='select'
                                name='status'
                                id='status'
                                defaultValue={props.data ? props.data.status : null}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    status: e.target.value
                                })}
                                required
                            >
                                <option value={null} hidden={true}>Select status</option>
                                <option value={1}>Available</option>
                                <option value={0}>Unavailable</option>
                            </AvField>
                        </AvGroup>
                    </Col>

                    {/* Legal Capacity */}
                    <Col sm='6' className="mb-2">
                        <AvGroup>
                            <Label for='legal_capacity'>Legal Capacity</Label>
                            <AvField
                                type='number'
                                name='legal_capacity'
                                id='legal_capacity'
                                placeholder="Enter legal capacity"
                                defaultValue={props.data ? props.data.legal_capacity : null}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    legal_capacity: e.target.value
                                })}
                                validate={validation.legal_capacity}
                            />
                        </AvGroup>
                    </Col>
                </Row>

                <div className="text-center mt-2">
                    <Button
                        type='submit'
                        color='primary'
                        disabled={props.loading}
                    >
                        {props.loading ? "Loading ..." : "Submit"}
                    </Button>
                    <Button className="text-center ml-2" onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </AvForm>
        </div>
    )
}