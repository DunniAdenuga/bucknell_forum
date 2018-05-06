import React, { Component } from 'react';
import firebase from '../firebase.js';
import HomePage from './HomePage'
import TopicsPage from './TopicsPage';


export default class AddTopicPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      title:'',
      description:'',
      date:null,
      changeToHome: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    var now = new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
    const topicsRef = firebase.database().ref('topics');
    const topic = {
    title: this.state.title,
    description: this.state.description,
    date: now,
  }
  topicsRef.push(topic);
  this.setState({
    title: '',
    description: '',
    changeToHome: true,
  });
}

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  addNewTopic(){
    if((this.props.addTopic)&&(this.state.changeToHome == false)){
      return(
        <div>
        <h2 className="text-center text-info"><b> New Topic ! </b></h2>
        <form onSubmit={this.handleSubmit}>
          <div class="form-group mx-5">
            <label for='title'>Title</label>
            <input id='title' type="text" class="form-control " placeholder="Enter Title" onChange={this.handleChange} />
          </div>
          <div class="form-group mx-5">
            <label for='description'>Description</label>
            <textarea id='description' class="form-control" rows="15" onChange={this.handleChange}> </textarea>
          </div>
          <button type="submit" class="btn btn-info ml-5 mb-5">Submit</button>
        </form>
        </div>
      );
    }else{
       <div>
       <HomePage />
       </div>
    }
  }

  render(){
    return(
      <div>
      {this.addNewTopic()}
      </div>
    );
  }
}
