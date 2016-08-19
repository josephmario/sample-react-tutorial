import React, { Component } from 'react';
import { Link } from 'react-router';
import TodoAddBox from './TodoAddBox';
import TodoList from './TodoList';
import Header from './Header';
import Completed from './Completed';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      item: '',
      todoList: ['item1', 'item2'],
      editingMode: false,
      checkedItem: false,
      completedItems: ['Hello']
    }
    this.onTextChange = this.onTextChange.bind(this);
    this.addButton = this.addButton.bind(this);
    this.removeItemInList = this.removeItemInList.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.completedItem = this.completedItem.bind(this);
  }

  onTextChange(e){
    this.setState({
      item: e.target.value
    })
    // console.log(this.state.item);
  }


  addButton(){
    let todoListArr = this.state.todoList;
    todoListArr.push(this.state.item);
    this.setState({
      todoList: todoListArr,
      item: ''
    })
    // console.log('Clicked!');
    console.log(this.state.todoList);
  }
  removeItemInList(i){
    let todoListArr = this.state.todoList;
    todoListArr.splice(i, 1);
    this.setState({
      todoList: todoListArr
    })
  }

  completedItem(i){
    let todoListArr = this.state.todoList.splice(i, 1);
    let completedItems = this.state.completedItems;
    completedItems.push(todoListArr);
    this.setState({
      completedItems: completedItems
    })
    // todoListArr[i] += " - Completed";
    // this.setState({
    //   todoList: todoListArr
    // })
    // console.log("new value: " + this.state.todoList);
  }

  updateItem(newValue, i){
    let todoListArr = this.state.todoList;
    todoListArr[i] = newValue;
    this.setState({
      todoList: todoListArr
    })
  }
  eachItemInList(item, i){
    return(
      <TodoList key={i} index={i} updateItemInList={this.addButton}>
        {item}
      </TodoList>
    );
  }
  render(){
    // console.log(this.state.todoList);
    return(
      <div className="container">
        <div className="row">
          <Header />
        </div>
        <div className="row">
        <TodoAddBox addButton={this.addButton} onTextChange={this.onTextChange}/>
          <div className="col-md-6">
              Active
              {this.state.todoList.map((item, i) => (
                <TodoList key={i} index={i} completedItem={this.completedItem} states={this.state} updateItemInList={this.updateItem} removeItem = {this.removeItemInList}>
                  {item}
                </TodoList>
              ))}
          </div>
        </div>
        <div className="row">
          <Completed completedItems={this.state.completedItems}/>
        </div>
      </div>
    )
  }
}
