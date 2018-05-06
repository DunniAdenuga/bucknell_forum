import React, { Component } from 'react';
import firebase from '../firebase.js';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';


export default class TopicsPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      allTopics: [],
      expandedArray: [],
    }
  }


  componentWillMount(){
    const topicsRef = firebase.database().ref('topics');
    topicsRef.on('value', (snapshot) => {
      let topics = snapshot.val();
      let newTopics = []
      let expandedTopics = []
      var i = 0
      for (let topic in topics){
        newTopics.push({
          index: i,
          id: topic,
          title: topics[topic].title,
          date: topics[topic].date, //add comments later
          description: topics[topic].description,
        })
        expandedTopics.push({
          [topic]: false
        })
        i++;
      }//for
      this.setState({
        allTopics: newTopics,
        expandedArray: expandedTopics,
      })
    })
  }

    handleToggle(event, toggle, index, id){
      console.log("toggle: index, id" + index + id)
      var newExpandedArray = []
      for(var i=0; i < this.state.expandedArray.length; i++){
        if(index === i){
          newExpandedArray.push({
            [id]: toggle
          })
        }
        else{
          var old = this.state.expandedArray[i]
          newExpandedArray.push(old)
        }
      }
      this.setState({
      expandedArray: newExpandedArray,
      })
    }

    getTopics(){
      if(this.props.showAllTopics){
        console.log("All Topics: "+ JSON.stringify(this.state.allTopics))
        var topics = this.state.allTopics.map(t =>
          <div className="mx-5 my-5 justify-content-center col-11 pb-5">
          <Card expanded={this.state.expandedArray[t.index][t.id]}>
            <CardTitle title={t.title} subtitle={t.date} expandable={false} />
            <CardText>
              <Toggle
                toggled={this.state.expandedArray[t.index][t.id]}
                onToggle={(event, toggle) => this.handleToggle(event, toggle ,t.index, t.id)}
                labelPosition="right"
                label="Show More..."
              />
            </CardText>
            <CardText expandable={true}>
              {t.description}
            </CardText>
          </Card>
        </div>
        )
        return(
          <div>
          <h2 className="text-center text-info mb-3"><b>Topics...</b></h2>
          {topics}
          </div>
        );
    }
  }

    render(){
      return(
        <div>
        {this.getTopics()}
        </div>
      );
    }


}
