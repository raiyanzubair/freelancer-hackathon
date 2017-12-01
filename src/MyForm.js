import React from 'react'
import { Container, InputGroupAddon, InputGroup, Input } from 'reactstrap' 

import { BLUE_BORDER } from './consts.js'

export default class MyForm extends React.Component {
	render() {
		return (
			<Container style={{ padding: "5px" }}>	
				<InputGroup>
        	<InputGroupAddon style={{width:"100px", borderColor: BLUE_BORDER, backgroundColor: "white", textAlign: "center", color: BLUE_BORDER }} >{this.props.provider}</InputGroupAddon>
        	<Input style={{ borderColor: BLUE_BORDER, backgroundColor: "white" }} placeholder="Enter username here..." name={this.props.provider} value={this.props.input} onChange={(event) => {this.props.change(event)}}/>
        </InputGroup>
			</Container>	
		)
	}
}
