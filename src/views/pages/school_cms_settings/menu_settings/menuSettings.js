
import React, { Component } from "react"
import ReactDOM from "react-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import ServiceCommandUnit from "./ServiceCommandUnit"
import './menu.scss'
import { AboutUsEnContent, AboutUsArContent, AddAboutUs } from "../../../../services/home/SchoolLandingPage"
import ErrorHandler from "../../../../common/ErrorHandler"
import Avatar from "@components/avatar"
import { MoreVertical, Edit, Trash, ChevronLeft, ChevronRight, Coffee } from 'react-feather'
import { FaTwitterSquare, FaInstagramSquare, FaYoutubeSquare, FaFacebookSquare} from 'react-icons/fa'
import { RiDeleteBinFill } from 'react-icons/ri'
import { Table, Form, Input, FormGroup, Label, FormFeedback, Button, Row, Col,  Media, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle  } from 'reactstrap'

import { authConfig } from "../../../../api-config/authConfig"
import Headers from "../../../../api-config/Headers"
import { toast, Slide } from "react-toastify"


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

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: '16px',
  margin: '8px',
  // change background colour if dragging
  background: isDragging ? "LightGray" : "LavenderBlush",
  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ?  "white" : "#7367f0",
  padding: '8px',
  width: '900px'
})

export default class menuSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      mainWidget: '',
      showMainWidget: false,
      mainWidgetValid: false,
      id: 1,
      subId: 1000,
      schoolId : parseInt(localStorage.getItem("schoolIdToken")),
      checkList: [],
      maturedFooter: []

    }
    this.onDragEnd = this.onDragEnd.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInnerAdd = this.handleInnerAdd.bind(this)
    this.handleShowMainWidget = this.handleShowMainWidget.bind(this)
    this.handleLabel = this.handleLabel.bind(this)
    this.handleLink = this.handleLink.bind(this)
    this.handleTarget = this.handleTarget.bind(this)
    this.setData = this.setData.bind(this)
  }

  onDragEnd(result) {
    if (!result.destination) {
      return
    }
    const sourceIndex = result.source.index
    const destIndex = result.destination.index
    if (result.type === "droppableItem") {
      const item = reorder(this.state.items, sourceIndex, destIndex)

      this.setState({
        items: item
      })
    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap = this.state.items.reduce((acc, item) => {
        acc[item.id] = item.subItems
        return acc
      }, {})

      const sourceParentId = result.source.droppableId
      const destParentId = result.destination.droppableId

      const sourceSubItems = itemSubItemMap[sourceParentId]
      const destSubItems = itemSubItemMap[destParentId]

      let newItems = [...this.state.items]
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        )
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.subItems = reorderedSubItems
          }
          return item
        })
        this.setState({
          items: newItems
        })
      } else {
        const newSourceSubItems = [...sourceSubItems]
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1)

        const newDestSubItems = [...destSubItems]
        newDestSubItems.splice(destIndex, 0, draggedItem)
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.subItems = newSourceSubItems
          } else if (item.id === destParentId) {
            item.subItems = newDestSubItems
          }
          return item
        })
        this.setState({
          items: newItems
        })
      }
      console.log(newItems)
    }
  }

    handleAdd () {
      const temp = [...this.state.items]
      const tempId = this.state.id
      if (!!this.state.mainWidget) {
        const pushObj = {
          id: `${tempId}${tempId}${tempId}${tempId}${tempId}${tempId}`,
          content: this.state.mainWidget,
          inputShow: false,
          contentValid: false,
          mainlink: '',
          mainlinkValid: false,
          mainTarget: '',
          mainTargetValid: false,
          clickable: false,
          contentData: '',
          subItems: []
        }
        temp.push(pushObj)
        this.setState({
          id: tempId + 1,
          items: temp,
          mainWidget: '',
          showMainWidget: false,
          mainWidgetValid: false
        })
      } else {
        this.setState({
          mainWidgetValid: true
        })
      }
  }
  handleDelete (index) {
    const temp = [...this.state.items]
    temp.splice(index, 1)
    this.setState({
      items: temp
    })
  }

  handleInnerAdd (index) {
    const temp = [...this.state.items]
    const tempId = this.state.subId
    if (!!temp[index].contentData) {
      const pushObj = {
        id: `${tempId}`,
        content: temp[index].contentData,
        label: temp[index].contentData,
        labelValid: false,
        link: '',
        linkValid: false,
        target: '',
        targetValid: false
      }  
      temp[index].contentValid = false
      temp[index].clickable = false      
      temp[index].inputShow = false
      temp[index].contentData = ''
      temp[index].subItems.push(pushObj)   
    } else {
      temp[index].contentValid = true
    }
  this.setState({
    subId: tempId + 1,
    items: temp
  })
  }
   handleInnerDelete (index, index2) {
    const temp = [...this.state.items]
  temp[index].subItems.splice(index2, 1)
  this.setState({
    items: temp
  })
  }
  handleInputShow (index) {
    const temp = [...this.state.items]
    temp[index].inputShow = true
    this.setState({
      items: temp
    })
  }
  handleCheckShow (index) {
    const temp = [...this.state.items]
    const tempList = [...this.state.checkList]
    if (tempList.includes(temp[index].id)) {
      temp[index].clickable = false
      tempList.splice(tempList.indexOf(temp[index].id), 1)
    } else {
      temp[index].clickable = true
      tempList.push(temp[index].id)
    }
    this.setState({
      items: temp,
      checkList: tempList
    })
  }
  
  handleShowMainWidget () {
    this.setState({
      mainWidget: '',
      showMainWidget: true,
      mainWidgetValid: false
    })
  }
  handleLabel (index1, index2, e) {
    const temp = [...this.state.items]
    temp[index1].subItems[index2].label = e.target.value
    temp[index1].subItems[index2].content = e.target.value
    this.setState({
      items: temp
    })
  }
  handleLink (index1, index2, e) {
    const temp = [...this.state.items]
    temp[index1].subItems[index2].link = e.target.value
    this.setState({
      items: temp
    })
  }
  handleTarget (index1, index2, e) {
    const temp = [...this.state.items]
    temp[index1].subItems[index2].target = e.target.value
    this.setState({
      items: temp
    })
  }


  handleSubmit () {
    let flag = 1
    const temp = [...this.state.items]
    temp.map((item) => {
      if (!!item.clickable) {
        if (!item.mainlink) {
          item.mainlinkValid = true
          flag = 0
        }
        if (!item.mainTarget) {
          item.mainTargetValid = true
          flag = 0
        }
      }
      item.subItems.map((it) => {
        if (!it.link) {
          it.linkValid = true
          flag = 0
        } else it.linkValid = false
        if (!it.target) {
          it.targetValid = true
          flag = 0
        } else it.targetValid = false
        if (!it.label) {
          it.labelValid = true
          flag = 0
        } else it.labelValid = false
      })
    })
    this.setState({
      items: temp
    })
    if (!!flag) {
      const reqObj = []
      temp.map((item) => {
        const tempObj = {
          id: +(item.id),
          Parent: item.content,
          subItems: []
        }
        item.subItems.map((it) => {
          tempObj.subItems.push({
            id: +(it.id),
            label: it.label,
            link: it.link,
            target: it.target === 'blank' ? 'blank' : 'self'
          })
        })
        if (!!item.clickable) {
          tempObj.mainlink = item.mainlink
          tempObj.mainTarget = item.mainTarget === 'blank' ? 'blank' : 'self'
          tempObj.fromClickable = true
        }
        reqObj.push(tempObj)
      })  
      reqObj.position = 'header'  
      // debugger

      authConfig.post('/menu', {menu_array: JSON.stringify({header: reqObj, footer: [...this.state.maturedFooter]})}, {
        headers: Headers()
      })
      .then((response) => {
          if (response && response.data) {
            const { data: { message } } = response.data
                     toast.success(<SuccessContent msg={message} />, {
                     transition: Slide,
                     hideProgressBar: true,
                     autoClose: 2000
                   })
                   window.location.href  = `/schooldetails/${this.state.schoolId}`
                  }
          return response
      })
      .catch((error) => {
          return error
      })
    }   
  }

  setData () {
    authConfig.get('/menu?position=header', {
      headers: Headers()
    })
    .then((response) => {
        if (response && response.data) {
          if (response) {
            if (response.data) {
              const { result } = response.data.data
              if (!!result) {
                const temp = []
                const tempFooter = [...result.menu_array.footer]
                result.menu_array.header.map((item) => {
                  const tempObj = {
                    id: `${item.id}1`,
                    content: item.Parent,
                    inputShow: false,
                    clickable: false,
                    mainlink: '',
                    mainlinkValid: false,
                    mainTarget: '',
                    mainTargetValid: false,
                    contentValid: false,
                    contentData: '',
                    subItems: []
                  }
                  item.subItems.map((it) => {
                    tempObj.subItems.push({
                      id: `${it.id}`,
                      content: it.label,
                      label: it.label,
                      labelValid: false,
                      link: it.link,
                      linkValid: false,
                      target: it.target === 'blank' ? 'blank' : 'self',
                      targetValid: false
                    })
                  })
                  if (!!item.fromClickable) {
                    tempObj.mainlink = item.mainlink
                    tempObj.clickable = true
                    tempObj.mainTarget = item.mainTarget
                  }
                  temp.push(tempObj)
                })
                this.setState({
                  items: temp,
                  maturedFooter: tempFooter
                })
              }
            }
        }
      }
        return response
    })
    .catch((error) => {
        return error
    })
  }
  componentDidMount () {
    this.setData()
  }
  render() {
    return (
  <div className="footer-setting">
    <div>
    <h1 className='main-head'>Menu setting</h1>
    </div>  
      <div className='d-flex justify-content-between'>
        {!!this.state.showMainWidget ? <div className='d-flex'><div className='wdth m-2'><Input invalid={this.state.mainWidgetValid} type="text" placeholder="Please Enter Widget Name Here" value={this.state.mainWidget} onChange={ (e) => { this.setState({ mainWidget: e.target.value }) } }/></div><Button color='primary' className='m-2' onClick={this.handleAdd}>Add New Widget</Button> </div> : <></>}
      {!!this.state.showMainWidget ? <></> : <Button color='primary' className='m-2' onClick={this.handleShowMainWidget}>Add New Widget</Button> }
      <Button color='primary' className='m-2' onClick={this.handleSubmit}>Submit</Button>
      </div>
      {!!this.state.items && this.state.items.length !== 0 ? <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" type="droppableItem">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className='boxShadow'
            >
              {this.state.items.map((item, index) => (
               <>
                
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div {...provided.dragHandleProps}>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        className='b-radius'
                      ><div className='d-flex justify-content-between'>
                        <div>
                        <span style={{color: "black", fontSize: '20px', fontWeight: 600}}>{item.content}</span>
                        {!item.inputShow && !item.clickable ? <Button color='primary' className='mx-1' onClick={this.handleInputShow.bind(this, index)}>Add New Widget</Button> : <></>}
                        </div>
                        {!!item.inputShow && !item.clickable ? <>
                        <div className='d-flex'>
                          <div className='wdth'><Input invalid={item.contentValid} type="text" placeholder="Please Enter Widget Name Here" onChange={(e) => { 
                            const temp = [...this.state.items]
                            temp[index].contentData = e.target.value
                            temp[index].contentValid = false
                             this.setState({ items: temp }) 
                             }}/></div>
                        <Button color='primary' className='mx-1' onClick={this.handleInnerAdd.bind(this, index)}>Add New Widget</Button>
                        </div></> : <></> }
                        {!!item.clickable ? <>
                        <div className='d-flex'>
                          {/* <div className='wdth'> */}
                          <FormGroup className='col-8'>
                          <Label for="link2" className="lebel">Link</Label>
                          <Input invalid={item.mainlinkValid} type="text" name="nameAr" id="nameAr" placeholder="Paste Link here" value={item.mainlink} onChange={(e) => { 
                            const temp = [...this.state.items]
                            temp[index].mainlink = e.target.value
                            temp[index].mainlinkValid = false
                             this.setState({ items: temp }) 
                             }}/>
                          <FormFeedback>Please enter valid Link</FormFeedback>
                          </FormGroup>
                          <FormGroup className='col-6'>
                          <Label for="link22" className="lebel">Target</Label>
                          <Input invalid={item.mainTargetValid} type="select" name="name2" id="name2" placeholder="Self/Blank" value={item.mainTarget} onChange={(e) => { 
                            const temp = [...this.state.items]
                            temp[index].mainTarget = e.target.value
                            temp[index].mainTargetValid = false
                             this.setState({ items: temp }) 
                             }}>
                            <option value={null}>Select Target </option> 
                            <option value={'self'}>_Self</option> 
                            <option value={'blank'}>_Blank </option> 
                            </Input>
                          <FormFeedback>Please enter valid target</FormFeedback>
                          </FormGroup>
                          {/* </div> */}
                        </div></> : <></> }
                        <div>
                        {!!item.subItems && item.subItems.length === 0 ? <span className='mx-2'><Input type='checkbox' onClick={this.handleCheckShow.bind(this, index)} checked={item.clickable}></Input><span>Clickable</span></span> : <></> }
                        <span className='cursor-pointer' style={{color: "red", fontSize: '16px', fontWeight: 500}} onClick={this.handleDelete.bind(this, index)}>Delete<RiDeleteBinFill size='16' className='cursor-pointer' color='red'/></span>
                        </div>
                        </div>
                        <ServiceCommandUnit
                          subItems={item.subItems}
                          type={item.id}
                          handleDel = {this.handleInnerDelete.bind(this, index)}
                          handleLabel = {this.handleLabel.bind(this, index)}
                          handleLink = {this.handleLink.bind(this, index)}
                          handleTarget = {this.handleTarget.bind(this, index)}
                        />
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
                </>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> : <></> }
      </div>
    )
  }
}

