import React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { RiDeleteBinFill } from 'react-icons/ri'
import { Table, Form, Input, FormGroup, Label, FormFeedback, Button, Row, Col,  Media, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle  } from 'reactstrap'
import './menu.scss'

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  width: "760px",
  padding: "12px",
  background: isDragging ? "lightgreen" : "Gainsboro",
  margin: "auto",
  border: "1px solid grey",
  borderRadius: '8px',
  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: '8px',
  margin: "10px",
  borderRadius: '8px'
})

export default class ServiceCommandUnit extends React.Component {
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div>
      {!!this.props.subItems && this.props.subItems.length !== 0 ? <Droppable droppableId={this.props.type} type={`droppableSubItem`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {!!this.props.subItems ? this.props.subItems.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div {...provided.dragHandleProps}>
                  <div
                  className='my-1'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div className='d-flex justify-content-between mb-1'>
                    <span className='mx-1' style={{color: "black", fontSize: '18px', fontWeight: 500}}>{item.content}</span>
                    <span className='cursor-pointer mx-2' style={{color: "red", fontSize: '14px', fontWeight: 500}} onClick={this.props.handleDel.bind(this, index)}>Delete<RiDeleteBinFill size='14' className='cursor-pointer' color='red'/></span>
                    </div>
                    <div className='row'>
                    <FormGroup className='col-4'>
                      <Label for="link1" className="lebel">Label</Label>
                      <Input invalid={item.labelValid} type="text" name="name" id="name" placeholder="Enter Label here" value={item.label} onChange={this.props.handleLabel.bind(this, index)}/>
                      <FormFeedback>Please enter valid Label</FormFeedback>
                    </FormGroup>
                    <FormGroup className='col-4'>
                      <Label for="link2" className="lebel">Link</Label>
                      <Input invalid={item.linkValid} type="text" name="nameAr" id="nameAr" placeholder="Paste Link here" value={item.link} onChange={this.props.handleLink.bind(this, index)}/>
                      <FormFeedback>Please enter valid Link</FormFeedback>
                    </FormGroup>
                    <FormGroup className='col-4'>
                      <Label for="link22" className="lebel">Target</Label>
                      <Input invalid={item.targetValid} type="select" name="name2" id="name2" placeholder="Self/Blank" value={item.target} onChange={this.props.handleTarget.bind(this, index)}>
                      <option value={null}>Select Target </option> 
                      <option value={'self'}>_Self</option> 
                      <option value={'blank'}>_Blank </option> 
                      </Input>
                      <FormFeedback>Please enter valid target</FormFeedback>
                     </FormGroup>
                    </div>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
          )) : <></>}
          {provided.placeholder}
        </div>
      )}
    </Droppable> : <></> }
    </div>   
    )
  }
}
