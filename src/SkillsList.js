import React from 'react'
import {Row, Col, Input, Container, Label, Button} from 'reactstrap'
import { BUTTON_STYLE, BLUE_BORDER } from './consts'

import './SkillsList.css'

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
				<div style={{ padding: "10px"}}>
				{this.props.keywords.map((word, index) => {
					return (
                                            <div style={{ padding: "5px", display: "inline-block"}}>
						<div key={index} style={{ borderStyle: "solid", borderWidth: "1px", borderRadius: "3px", textSize:"1em", borderColor: BLUE_BORDER, color: "white", display: "inline-block", padding: "5px"}} 
                                                  className="checkboxblue"
                                                >	
							<div style={{ textAlign: "center"}} className="co">
								<Input 
                                                                  name={word} type="checkbox" key={index} onClick={(event) => this.handleChange(event)}
                                                                  style={{ display: "none"}}
                                                                />
								{word}
							</div>
						</div>	
                                            </div>	
					)
				})}
				</div>
				<Button onClick={() => this.passToFreelancer(this.state)} style={BUTTON_STYLE}>Find jobs</Button>
			</Container>
		)
	}
}
