import React from 'react'
import { Container, Row, Button} from 'reactstrap'
import MyForm from './MyForm' 
import JobTable from './JobTable'
import SkillsList from './SkillsList'
import axios from 'axios'
import ReactLoading from 'react-loading';
import { PROD_ACCESS_TOKEN } from './consts'

import { BUTTON_STYLE } from './consts.js'

export default class Body extends React.Component {
	componentWillMount() {
		this.setState({
			GitHub: "",
			BitBucket: "",
			Freelancer: "",
			projects: [],
			keywords: [],
			jobs: [],
		})
		this.searchFreelancerProjects = this.searchFreelancerProjects.bind(this)
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
		})
	}

	searchBitBucket(username) {
		if (!username) {
  		return
  	}
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
    })
  }

  searchFreelancer(username) {
  	if (!username) {
  		return
  	}
  	return axios.get(`https://www.freelancer.com/api/users/0.1/users/`, {
  		headers: {
				"Freelancer-OAuth-V1": PROD_ACCESS_TOKEN, 
			},
			params: {
				"usernames[]": username,
				"jobs": true
			}
  	}).then(response => {
  		console.log(response.data)
  		Object.keys(response.data.result.users).forEach((key) => {
  			response.data.result.users[key].jobs.map((job) => {
  				this.setState({
  					keywords: this.state.keywords.concat(job.name)
  				})
  			})
  		})
  	})
  }

  findMySkills(state) {
  	this.setState({projects: [], keywords: [], loading: true})
  	// this.searchGitHub(state.GitHub).then(() => { 
  	this.searchFreelancer(state.Freelancer).then(() => {
  		return this.searchBitBucket(state.BitBucket)
  	}).then(() => {
	  	this.setState({
	  		keywords: this.state.keywords.filter((value, index, self) => {
					return self.indexOf(value) === index && value !== "" 
				}),
  			loading: false 
  		})
  	}).catch(error => {
  		console.log(error)
  	})
  }

  searchFreelancerProjects(skillsArray) {
  	this.setState({ 
			jobs: [],
			loading: true,
		})
		axios.get(`https://www.freelancer.com/api/projects/0.1/projects/active/`, {
			headers: {
				"Freelancer-OAuth-V1": PROD_ACCESS_TOKEN, 
			},
			params: {
				"query": skillsArray.join(" "),
				"include_contests": "true",
			}
		}).then(response => {
			response.data.result.projects.map(job => {
				this.setState({ 
					jobs: this.state.jobs.concat([{
						id: job.id,
						title: job.title,
						description: job.description !== null ? job.description : job.preview_description,
						link: `https://www.freelancer.com/projects/${job.seo_url}`
					}]) 
				})
			})
			this.setState({loading: false})
		}).catch(error => {
			console.log(error.message)
		})
  }

	render() {
		return (
			<div>
				<Container style={{margin: "auto", textAlign: "center", maxWidth: "800px", padding: "5px"}}>
					<Row><MyForm provider="GitHub" input={this.state.GitHub} change={(event) => this.onChange(event)}/></Row>
					<Row><MyForm provider="BitBucket" input={this.state.BitBucket} change={(event) => this.onChange(event)}/></Row>
					<Row><MyForm provider="Freelancer" input={this.state.Freelancer} change={(event) => this.onChange(event)}/></Row>
					<br/>
					<Button style={BUTTON_STYLE} onClick={() => this.findMySkills(this.state)}>Find my skills</Button>
				</Container>
				{this.state.keywords.length === 0 ? null
					:
					<Container style={{margin: "auto", maxWidth: "800px", padding: "5px"}}>
						<hr/>
						<SkillsList searchFreelancerProjects={this.searchFreelancerProjects} keywords={this.state.keywords}/>
					</Container>
				}
				{this.state.loading ? <div style={{verticalAlign: "middle"}}><ReactLoading type="spin" color="#8CB0EC" height='64px' width='64'/></div> 
						:
					this.state.jobs.length === 0 ? null
					:
					<Container>
						<hr/>
						<JobTable projects={this.state.jobs} />
					</Container>
				}	
			</div>	
		)
	}
}
