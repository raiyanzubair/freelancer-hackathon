import React from 'react'
import {Row, Col, Input, Container, Label, Button} from 'reactstrap'
import { BUTTON_STYLE } from './consts'

export default class SkillsList extends React.Component {
	componentWillMount() {
		this.setState({			
		}) 
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: !this.state[event.target.name]
		})
	}

	//push all the checked boxes into an array and pass that to a function in props that searches for jobs on Freelancer
	passToFreelancer(state) {
		var chosenSkills = [] 
		Object.keys(state).map(key => {
			if (state[key]) {
				chosenSkills.push(key)
			}
		})
		if (chosenSkills.length !== 0) {
			this.props.searchFreelancer(chosenSkills)
		}
	}

	render() {
		console.log(this.state)
		return (
			<Container>
				<Label>Select the skills you wish to look for jobs in</Label>
				<Col>
				{this.props.keywords.map((word, index) => {
					return (
						<Row key={index}>	
							<Label>
								<Input name={word} type="checkbox" key={index} onClick={(event) => this.handleChange(event)}/>
								{word}
							</Label>
						</Row>	
					)
				})}
				</Col>
				<Button onClick={() => this.passToFreelancer(this.state)} style={BUTTON_STYLE}>Find jobs</Button>
			</Container>
		)
	}
}