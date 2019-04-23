import React, { Component } from 'react';
import Column from './Column/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import './BasicPageComponent.scss';

const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

class BasicPageComponent extends Component {
  state = {
    items: [],
    items2: []
  };

  onFileUpload = (files, id) => {
    let state = Object.assign({}, this.state);
    if (files.length > 0) {
      for (let file of files) {
          state[id].push({
              id: file.name,
              content: <img src={file.preview} className="drag-image"/>
          })
      }
      console.log(files);
      this.setState(state);
    }
  }

  changeState = (arrays) => {
    let state = Object.assign({}, this.state);
    for (let {items, id} of arrays) {
        state[id] = items
    }
    this.setState(state);
  };

  reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
  };

  move = (source, destination, droppableSource, droppableDestination) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);
      destClone.splice(droppableDestination.index, 0, removed);
      const result = {};
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;
      return result;
  };

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }
    if (source.droppableId === destination.droppableId) {
        const items = this.reorder(
            this.state[source.droppableId],
            source.index,
            destination.index
        );
        this.changeState([{items, id: source.droppableId}]);
    } else {
      const result = this.move(
          this.getList(source.droppableId),
          this.getList(destination.droppableId),
          source,
          destination
      );

      this.changeState([{
          id: source.droppableId,
          items: result[source.droppableId]
      }, {
          id: destination.droppableId,
          items: result[destination.droppableId]
      }]);
    }
  };

  getList = id => this.state[id];

  render() {
    return <div className="container">
        <h1>React Drag and Drop</h1>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="split-cols">
              <Column
                name='items'
                items={this.state.items}
                getList={this.getList}
                changeState={this.changeState}
                onFileUpload={this.onFileUpload}
              />
          </div>
          <div className="split-cols">
              <Column
                name='items2'
                items={this.state.items2}
                getList={this.getList}
                changeState={this.changeState}
                onFileUpload={this.onFileUpload}
              />
          </div>
        </DragDropContext>
      </div>;
  }
}

export default BasicPageComponent;
