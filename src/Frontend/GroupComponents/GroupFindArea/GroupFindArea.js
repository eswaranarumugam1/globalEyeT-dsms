import { Form, FormGroup, Input } from 'reactstrap'
import './GroupFindArea.scss'
function GroupFindArea() {
    return (
        <div className="find-area-block">
            <Form>
                <FormGroup>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>Find Your Area</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
            </Form>

        </div>
    )
}

export default GroupFindArea