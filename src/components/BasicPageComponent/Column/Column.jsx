import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: '100%',
    minHeight: 400
});

function OuterDropzone(props) {
    const { getRootProps } = useDropzone({
        noClick: true,
        accept: 'image/jpeg, image/png',
        onDrop: acceptedFiles => {
            let files = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }));
            props.onFileUpload(files, props.listId);
        }
    });

    return (
        <div className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <p>Drag 'n' drop some files here, or click to select files</p>
                {props.children}
            </div>
        </div>
    );
}

class Column extends Component {

    render() {
        return(
            <OuterDropzone onFileUpload={this.props.onFileUpload} listId={this.props.name}>
                <Droppable droppableId={this.props.name}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.props.items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </OuterDropzone>
        );
    }
}

export default Column;
