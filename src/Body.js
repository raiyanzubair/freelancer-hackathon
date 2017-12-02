import React from 'react'
import { Label, Container, Row, Button} from 'reactstrap'
import MyForm from './MyForm' 
import JobTable from './JobTable'
import SkillsList from './SkillsList'
import axios from 'axios'
import ReactLoading from 'react-loading';
import { PROD_ACCESS_TOKEN, ACCESS_TOKEN } from './consts'

import { BUTTON_STYLE } from './consts.js'

export default class Body extends React.Component {
	componentWillMount() {
		this.setState({
			GitHub: "",
			BitBucket: "",
			projects: [],
			keywords: [],
			projects: [],
		})
		this.searchFreelancer = this.searchFreelancer.bind(this)
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	searchGitHub(username) {
		return axios.get(`https://api.github.com/users/${username}/repos`, {
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
          }]),
          keywords: this.state.keywords.concat([repo.language])
        })
			})
			console.log(response)
		})
	}

	searchBitBucket(username) {
    return axios.get(`https://api.bitbucket.org/2.0/users/${username}/repositories`).then(response => {
      response.data.values.map(repo => {
        this.setState({
          projects: this.state.projects.concat([{
          	provider: "BitBucket",
            id: this.state.projects.length,
            name: repo.name,
            description: repo.description,
            language: repo.language,
            url: `https://bitbucket.org/${repo.full_name}`
          }]),
          keywords: this.state.keywords.concat([repo.language])
        })
      })
      console.log(response)
    })
  }

  findMySkills(state) {
  	this.setState({projects: [], keywords: [], loading: true})
  	// this.searchGitHub(state.GitHub).then(() => {
  	// 	return 
  	this.searchBitBucket(state.BitBucket).then(() => {
  		console.log("joining")
	  	this.setState({
	  		keywords: this.state.keywords.filter((value, index, self) => {
					return self.indexOf(value) === index && value !== "" 
				}).map(value => {
  				return value.toLowerCase()
  			}),
  			loading: false 
  		}) 
  	}).catch(error => {
  		console.log(error)
  	})
  }

  searchFreelancer(skillsArray) {
  	this.setState({ 
			projects: []
		})
  	var skillIDs = []
  	skillsArray.forEach((item) => {
  		axios.get(`https://www.freelancer.com/api/projects/0.1/jobs/`, {
  			headers: {
  				"Freelancer-OAuth-V1": PROD_ACCESS_TOKEN, 
  			},
  			params: {
  				"job_names[]": item,
  			}
  		}).then(response => {
  			console.log(response.data)
  		})
  	})
  	axios.get(`https://www.freelancer.com/api/projects/0.1/projects/active/?query=${skillIDs}`).then(response => {
  		response.data.result.projects.map(project => {
  			// console.log(project)
  			this.setState({ 
  				projects: this.state.projects.concat([{
  				}]) 
  			})
  		})
  	}).catch(error => {
  		console.log(error.message)
  	})
  }

	render() {
		return (
			<div>
				<Container style={{margin: "auto", textAlign: "center", maxWidth: "800px", padding: "5px"}}>
					<Row><MyForm provider="GitHub" input={this.state.github} change={(event) => this.onChange(event)}/></Row>
					<Row><MyForm provider="BitBucket" input={this.state.bitbucket} change={(event) => this.onChange(event)}/></Row>
					<br/>
					<Button style={BUTTON_STYLE} onClick={() => this.findMySkills(this.state)}>Find my skills</Button>
				</Container>
				<hr/>
				<div>
				{this.state.keywords.length === 0 ? null
					:
					this.state.loading ? <ReactLoading style={{margin:"auto"}} type="spin" color="#ffff" height='100' width='100'/> 
						:
						<Container style={{margin: "auto", maxWidth: "800px", padding: "5px"}}>
							<SkillsList searchFreelancer={this.searchFreelancer} keywords={this.state.keywords}/>
						</Container>
				}	
				</div>
			</div>	
		)
	}
}
