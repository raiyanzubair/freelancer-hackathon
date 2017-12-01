import React from 'react'
import { Container, Row, Button, Table} from 'reactstrap'
import MyForm from './MyForm' 
import JobTable from './JobTable'
import axios from 'axios'
import { PROD_ACCESS_TOKEN, ACCESS_TOKEN } from './consts'

import { BLUE_BORDER } from './consts.js'

export default class Body extends React.Component {
	constructor() {
		super()
		this.state = {
			GitHub: "",
			BitBucket: "",
			projects: [],
		}
		this.onChange = this.onChange.bind(this)
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	searchGitHub(username) {
		axios.get(`https://api.github.com/users/${username}/repos`, {
			headers: {
				"Accept": "application/vnd.github.v3+json"
			}
		}).then(response => {
			response.data.map(repo => {
				this.setState({
          projects: this.state.projects.concat([{
            provider: "GitHub",
            id: repo.id,
            name: repo.name,
            description: repo.description,
            language: repo.language,
            url: repo.svn_url
          }])
        })
			})
		}).catch(error => {
			console.log(error.message)
		})
	}

	searchBitBucket(username) {
    axios.get(`https://api.bitbucket.org/2.0/users/${username}/repositories`).then(response => {
      response.data.values.map(repo => {
        this.setState({
          projects: this.state.projects.concat([{
          	provider: "BitBucket",
            id: this.state.projects.length,
            name: repo.name,
            description: repo.description,
            language: repo.language,
            url: `https://bitbucket.org/${repo.full_name}`
          }])
        })
      })
    }).catch(error => {
      console.log(error)
    })
  }

  findMeJobs(state) {
  	this.setState({projects: []})
  	this.searchGitHub(state.GitHub)
  	this.searchBitBucket(state.BitBucket)
  	// this.searchFreelancer()
  }

  //  <Container style={{margin: "auto", textAlign: "center", maxWidth: "800px"}}>

	render() {
		return (
			<div>
				<Container style={{margin: "auto", textAlign: "center", maxWidth: "800px", padding: "5px"}}>
					<Row><MyForm provider="GitHub" input={this.state.github} change={this.onChange}/></Row>
					<Row><MyForm provider="BitBucket" input={this.state.bitbucket} change={this.onChange}/></Row>
					<br/>
					<Button style={{ borderColor: BLUE_BORDER, backgroundColor: "white", color: BLUE_BORDER, margin: "auto" }} onClick={() => this.findMeJobs(this.state)}>FIND ME WORK</Button>
				</Container>
				<hr/>
				<div>
				{this.state.projects.length === 0 ? null
					:
						<JobTable projects={this.state.projects}/>
				}	
				</div>
			</div>	
		)
	}
}
