import React, { useState } from 'react'
import { Row, Label, CustomInput, Col, Button, Input } from 'reactstrap'

function BalenceForm() {

    const [showDiv, setShow] = useState(false)

    return (
        <div>
            <Row>
                <Col sm='4'>
                    <Input type='checkbox' id='chkDueInvoices' /><h5>Access With Due Invoices</h5> <br />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='invoice' name='invoice' inline label='Yes' />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='invoice1' name='invoice' inline label='No' />
                </Col>
                <Col sm='4'>
                </Col>

                <Col sm='4'>
                    <Input type='checkbox' id='chkEnoughBalance' /><h5>Access If Enough Balance</h5> <br />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='balance' name='balance' inline label='Yes' />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='balance1' name='balance' inline label='No' />
                </Col>
                <Col sm='4'>

                </Col>

                <Col sm='4'>
                    <Input type='checkbox' id='chkEndsWithExam' /><h5>Ends With Exam</h5> <br />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='exam' name='exam' inline label='Yes' value='yes' onClick={() => setShow(true)} />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='exam1' name='exam' inline label='No' value='no' onClick={() => setShow(false)} />
                </Col>
                <Col sm='4'>

                </Col>
                {/* ---------------configured Exam--------------- */}
                <Col sm='4'>
                    <Input type='checkbox' id='chkReqAttendance' /><h5>Pre req Attendance all sessions</h5> <br />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='exam' name='exam' inline label='Yes' value='yes' onClick={() => setShow(true)} />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='exam1' name='exam' inline label='No' value='no' onClick={() => setShow(false)} />
                </Col>
                <Col sm='4'>
                </Col>

                <Col sm='4'>
                    <Input type='checkbox' id='chkdueInvoice' /><h5>Attendance with due invoice</h5> <br />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='exam' name='exam' inline label='Yes' value='yes' onClick={() => setShow(true)} />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='exam1' name='exam' inline label='No' value='no' onClick={() => setShow(false)} />
                </Col>
                <Col sm='4'>
                </Col>

                <Col sm='4'>
                    <Input type='checkbox' id='chkEnoughBalance' /><h5>Attendance if enough Balance</h5> <br />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='exam' name='exam' inline label='Yes' value='yes' onClick={() => setShow(true)} />
                </Col>
                <Col sm='2'>
                    <CustomInput type='radio' id='exam1' name='exam' inline label='No' value='no' onClick={() => setShow(false)} />
                </Col>
                <Col sm='4'>
                </Col>
                <Col sm='12'>
                    <br />
                    <Button color='primary' type='submit'>
                        Save
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default BalenceForm
