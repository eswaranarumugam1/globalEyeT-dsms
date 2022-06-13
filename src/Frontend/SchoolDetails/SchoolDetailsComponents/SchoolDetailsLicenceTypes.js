import { useState, useEffect, useRef } from 'react'
import { fetchLicenses, fetchSubcategory, fetchSubLicenses, fetchSchoolData } from '../../../services/frontend/schoollist'
import Cards from './Cards'
// import console.log from "../../../common/console.log"
import SubLicenses from './SubLicenses'
import Subcategory from './Subcategory'
import Training from './Training'
import TypeofLicense from './TypesofLicense/TypeofLicense'
import DrivingLicenseCard from './DrivingLicenseCard'
import { ArrowLeftCircle } from 'react-feather'
import './SchoolDetailsLicenceTypes.scss'
import SchoolAboutUs from '../../Components/AboutUs/SchoolAboutUs'

function SchoolDetailsLicenceType({ id }) {

    const [loading, setLoading] = useState(false)
    const [licenses, setLicenses] = useState([])
    // const [data, setData] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    const [tab, setTab] = useState('tab1')
    const [subLicenses, setSubLicenses] = useState({})
    const [categories, setCategories] = useState([])
    const [subcategoryList, setSubcategoryList] = useState([])
    const [training, setTraining] = useState({})
    const [tabs, setTabs] = useState([])
    console.log(id)
    const sublicense = useRef()
    const selection = useRef({})
    const arrowPos = useRef(40)
    const activeSubcategory = useRef(null)

    const getLicenses = async () => {
        try {
            const response = await fetchLicenses(id)
            if (response) {
                console.log(response)
                if (response.data) {
                    const { data: { result } } = response.data
                    if (result && result.length && result.length > 0) {
                        setLicenses(result)
                        setLoading(false)
                    }
                }
            }
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }
    const getSchoolData = async () => {
        try {
            const response = await fetchSchoolData(id)
            if (response) {
                if (response.data) {
                    const { data: { result } } = response.data
                    if (result && result.length && result.length > 0) {
                        setData(result)
                        console.log('hi', result)
                        setLoading(false)
                    }
                }
            }
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }
    
    useEffect(() => {
        window.scrollTo(0, 0)
        if (id) {
            setLoading(true)
            getLicenses()
            // getSchoolData()
        }
        return () => {
            setLicenses([])
            // setData([])
        }
    }, [])

    const handleLicenseSelection = async (id) => {
        try {
            const response = await fetchSubLicenses({ license_id: id })
            if (response && response.data) {
                const { data: { result } } = response.data
                if (result && result.length > 0) {
                    setSelectedId(id)
                    setTab('sub_license')
                    const subLicenses = result.find((x) => x.key === 'sub_license')
                    setSubLicenses(subLicenses)
                    const training = result.find((x) => x.key === 'sub_plans')
                    setTraining(training)
                    const categories = result.filter((x) => x.key !== 'sub_license' && x.key !== 'sub_plans')
                    setCategories(categories)
                    const tabs = result.filter((x) =>  x.data !== null && x.data !== undefined && x.data !== '').map((x) => {
                        return {
                            label: x.key === 'sub_license' ? 'Select License Category' : x.key === 'sub_plans' ? 'Training Plans' : x.label,
                            key: x.key
                        }
                    })

                    setTabs(tabs)

                    sublicense.current = null
                    selection.current = {}
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleTypeChange = (e) => {
        handleLicenseSelection(e.target.value)
    }

    const getIndex = (active_tab) => {
        const tabIndex = tabs.findIndex((x) => x.key === active_tab)
        return tabIndex
    }

    const getActiveSubcategory = (active_key) => {
        const currentTab = tabs.find((tab) => tab.key === active_key)
        return selection.current[currentTab.key]
    }

    const handleTabs = async (active_key) => {
        try {
            switch (active_key) {
                case 'sub_license':
                    arrowPos.current = 40
                    setTab(active_key)
                    break
                case 'sub_plans':
                    arrowPos.current = (getIndex(active_key) * 280) 
                    setTab(active_key)
                    break
                default:
                    const tabIndex = getIndex(active_key)
                    arrowPos.current = (tabIndex * 300) + 40
                    // activeSubcategory.current = getActiveSubcategory(active_key)
                    const categoryList = categories.find((x) => x.key === active_key)
                    setSubcategoryList(categoryList)
                    setTab(active_key)
                    break
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSublicenseSelection = (id) => {
        sublicense.current = id
        selection.current[tab] = id
    }


    const handlePlanSelection = (id) => {
        selection.current[tab] = id
    }

    const handleSubcategorySelection = (id) => {
        const currentTab = tabs.find((x) => x.key === tab)
        if (selection.current[currentTab.key] === id) {
            selection.current[currentTab.key] = null
        } else {
            selection.current[currentTab.key] = id
        }
    }

    const getNextTab = () => {
        const tabIndex = tabs.findIndex((x) =>  x.key === tab)
        arrowPos.current = arrowPos.current + 250
        handleTabs(tabs[tabIndex + 1].key)
    }

    return (
        <div>
            {tab && tab === 'tab1' &&
                <>
                    {/* <DrivingLicenseCard /> */}
                  
                    <SchoolAboutUs id={id}  style={{padding:'15px'}} />
                    
                    <div className="landing-container text-center">
                        {loading && <div>Loading...</div>}
                        {licenses && licenses.length > 0 && <TypeofLicense licenses={licenses} selectCat={handleLicenseSelection} />}
                        {!loading && licenses && licenses.length === 0 && <p>Licenses not found</p>}
                    </div>
                </>
            }
            {
                tab && tab !== 'tab1' &&
                <>
                    <div className='container-fluid top-select'>
                        <ArrowLeftCircle onClick={() => setTab('tab1')} className='go-back' />
                        <select className='select-license' onChange={handleTypeChange} value={selectedId}>
                            {
                                licenses && licenses.map((license) => {
                                    return (
                                        <option value={license.id} key={license.id}>{license.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='container-fluid category'>
                        <ul className='tabs'>

                            {
                                tabs && tabs.map((x) => {
                                    return (
                                        <li key={x.key} className={tab === x.key ? 'active-tab' : ''} onClick={() => handleTabs(x.key)}>{x.label}</li>
                                    )
                                })
                            }
                        </ul>
                        <div className="category-container">
                            <div className='arrow-up' style={{left: `${arrowPos.current}px`}}></div>
                                {subLicenses && tab === 'sub_license' && (
                                    <SubLicenses licenses={subLicenses.data} handleSelection={handleSublicenseSelection} activeid={sublicense.current} nextTab={getNextTab}/>
                                )}

                                {categories && tab !== 'tab1' && tab !== 'sub_license' && tab !== 'sub_plans' && 
                                    categories.map((cat) => {
                                        return (
                                            <Subcategory key={cat.key} licenses={cat.data} handleSelection={handleSubcategorySelection} activeid={selection.current[cat.key]} nextTab={getNextTab} style={{display: subcategoryList.key === cat.key ? 'block' : 'none'}} />
                                        )
                                    })
                                }
                                
                                {training && tab === 'sub_plans' && (
                                    <Training handleSelection={handlePlanSelection} activeid={selection.current['sub_plans']} id={id} />
                                )}
                        </div>
                    </div>
                </>
            }
        </div>

    )
}

export default SchoolDetailsLicenceType