import React from 'react'
import { Container, InputGroupAddon, InputGroup, Input } from 'reactstrap' 

export default class MyForm extends React.Component {
	render() {
		return (
			<Container>	
				<InputGroup>
	        <InputGroupAddon style={{width:"100px"}}>{this.props.provider}</InputGroupAddon>
	        <Input placeholder="enter username here" name={this.props.provider} value={this.props.input} onChange={(event) => {this.props.change(event)}}/>
	      </InputGroup>
			</Container>	
		)
	}
}