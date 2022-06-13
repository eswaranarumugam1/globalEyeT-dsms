import { useEffect, useState } from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import './FindArea.scss'
import { fetchGetProvince, fetchSchoolList } from "../../../services/frontend/schoollist"
import { useParams, useHistory } from 'react-router-dom'

function FindArea() {
    const history = useHistory()
    const [schoolOption, setSchoolOption] = useState('')
    const getSchoolList = async () => {
        try {
            const response = await fetchGetProvince()
            //   console.log(response)
            if (response) {
                if (response.data) {
                    const { data: { result: data } } = response.data
                    if (data && data.length && data.length > 0) {
                        setSchoolOption(data)
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    
    const linktoschool = (id) => {
        // debugger
        history.push(`/schooldetails/${id}`)
      }

      const linktosearchschool = (location) => {
        // debugger
        history.push(`/school-list?location=${location}`)
      }

    useEffect(() => {
        getSchoolList()
    }, [])


    return (
        <div className="find-area-block">
            <Form>
                <FormGroup>
                    <Input type="select" name="select" id="exampleSelect" onChange={(e) => { linktosearchschool(e.target.value) }}  >
                        <option className="option">Find Your Area</option>
                        {
                            schoolOption ? schoolOption.map((ele) => (
                                <option value={ele.name} key={ele.id} className="option">{ele.name}</option>
                            )) : null
                        }
                    </Input>
                </FormGroup>
            </Form>
        </div>
    )
}

export default FindArea