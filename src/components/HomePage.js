import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import TopicsPage from './TopicsPage';
import AddTopicPage from './AddTopicPage'


export default class HomePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      addTopic: false,
      showAllTopics:true,
    }
  }

  showTime(){
    var options = {timeZone: "America/New_York"}
    var now = new Date()
    var element = document.getElementById("date3")
    element.textContent = now.toLocaleString("en-US", options)
  }

  render(){
    var options = {timeZone: "America/New_York"}
    return(
      <MuiThemeProvider>
        <div>

          <div  className="mx-5 my-5 jumbotron">
            <h2 className="text-center text-info"><b> Welcome to Bucknell Forum ! </b></h2>
            <p id="date3" className="date">{new Date().toLocaleString("en-US", options)}</p>
            <FloatingActionButton
            style={{marginLeft: '87%',}}
            onClick={()=>this.setState({addTopic: true, showAllTopics: false})}
            >
              <AddIcon />
            </FloatingActionButton>
          </div>

          <TopicsPage
          showAllTopics={this.state.showAllTopics}
          />

          <AddTopicPage
          addTopic={this.state.addTopic}
          />

        </div>
      </MuiThemeProvider>
    );
    //{setInterval(this.showTime(), 1000)}

  }
}
