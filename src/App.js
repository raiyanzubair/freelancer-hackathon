import React, { Component } from 'react';
import { Container } from 'reactstrap'
import axios from 'axios'
import Header from './Header'
import Body from './Body'
import { ACCESS_TOKEN } from './consts'

class App extends Component {
  constructor() {
    super()
    this.state = {
      bitbucketInput: "",
      bitbucketResults: "",
      freelancerInput: "",
      freelancerResults: "",
      projects: []
    }
    this.getRequest = this.getRequest.bind(this)
  }

  onChange(event) {
    this.setState({ 
      [event.target.name]: event.target.value
    })
  }

  getRequest(username) {
    axios.get(`https://api.github.com/users/${username}/repos`).then(response => {
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  getRequest2(username) {
    axios.get(`https://api.linkedin.com/v1/people/~?format=json`).then(response => {
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  bitBucket(username) {
    axios.get(`https://api.bitbucket.org/2.0/users/${username}/repositories`).then(response => {
      response.data.values.map(repo => {
        console.log(repo)
        this.setState({
          projects: this.state.projects.concat([{
            id: this.state.projects.length,
            name: repo.name,
            description: repo.description,
            language: repo.language
          }])
        })
      })
    }).catch(error => {
      console.log(error)
    })
  }

  freelancer(username) {
    axios.get(`https://www.freelancer-sandbox.com/api/users/0.1/users/directory/?countries[]=Australia`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Freelancer-OAuth-V1": ACCESS_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
      credentials: 'same-origin',
    }).then(response => {
      console.log(response.data)
    }).catch(error => {
      console.log(error.message)
    })
  }

  render() {
    return (
      <div>
        <Header/>
        <br/>
        <Body/>
      </div>
    );
  }
}

export default App;
