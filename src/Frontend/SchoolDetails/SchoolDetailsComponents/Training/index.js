import './style.scss'
import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { CheckCircle } from 'react-feather'
import guard from './guard.svg'
import { fetchPlanData } from '../../../../services/frontend/schoollist'
import { Link } from "react-router-dom"
export default function Training({handleSelection, activeid, id}) {
  const [active, setActive] = useState(activeid)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } })
  const selectPlan = (id) => {
    setActive(id)
    handleSelection(id)
  }

  // const plans = [
  //   {
  //     id: 1,
  //     title: 'BEGINNER’S PLAN',
  //     duration: '30HRS',
  //     price: 'SAR 2,250',
  //     description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  //     provides: [
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor'
  //     ],
  //     inspection: false
  //   },
  //   {
  //     id: 2,
  //     title: 'INTERMEDIATE PLAN',
  //     duration: '12HRS',
  //     price: 'SAR 950',
  //     description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  //     provides: [
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor'
  //     ],
  //     inspection: true
  //   },
  //   {
  //     id: 3,
  //     title: 'EXPERT’S PLAN',
  //     duration: '30HRS',
  //     price: 'SAR 2,250',
  //     description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  //     provides: [
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor',
  //       'Lorem ipsum dolor'
  //     ],
  //     inspection: true
  //   }
  // ]
  const getPlanData = async () => {
    const response = await fetchPlanData(id)
    if (response) {
        if (response.data) {
            const { data: { result } } = response.data
            if (result && result.length && result.length > 0) {
                setData(result)
                setLoading(false)
            }
        }
    }
}
const handleRegisHref = (planId) => {
  const url = `/authPage?from=plan&id=${id}&planId=${planId}`
  window.location.href = url
}
  useEffect(() => {
    if (id) {
        setLoading(true)
        getPlanData()
    }
    return () => {
        setData([])
    }
}, [])

  return (
    <div className='training'>
      <Row className='plan-container'>
        {data && data.map((plan) => {
          return (
            <div className={`plan ${active === plan.id ? 'active' : ''}`} key={plan.id} onClick={() => selectPlan(plan.id)}>
                  <div className='plan-inner'>
                    <h2>{plan.title}</h2>
                    <h4>{plan.duration} - {plan.price}</h4>
                    <p className='text-center'>{renderHTML(plan.description)}</p>
                    <ul>
                      {
                        plan.provides && plan.provides.map((p, i) => {
                          return (
                            <li key={i}><CheckCircle style={{width: '20px', height: '20px', background: '#817B7B', color: '#FFF', borderRadius: '50%'}}/> {p}</li>
                          )
                        })
                      }
                    </ul>
                    {plan.inspection && <div className='inspection'>
                      <img src={guard} />
                        INSPECTION REQUIRED
                    </div>}
                    <button className={`btn ${active === plan.id ? 'active' : ''}`} onClick={handleRegisHref.bind(this, plan.id)}>Continue</button>
                    <a href='#'>Read More</a>
                  </div>
            </div>
          )
        })}
      </Row>
    </div>
  )
}
