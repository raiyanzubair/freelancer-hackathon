import React from 'react'
import { Jumbotron } from 'reactstrap' 
import { BLUE_BORDER } from './consts'

export default class Header extends React.Component {
	render() {
		return (
			<Jumbotron style={{background:BLUE_BORDER, margin: "auto", textAlign: "center", maxWidth: "800px"}}>
				<h1 style={{color: "white", fontFamily: "Abril Fatface"}} className="display-3">grunter</h1>
			</Jumbotron>
		)
	}
}
