import React from 'react'
import { Jumbotron, Row, Col } from 'reactstrap' 

export default class Header extends React.Component {
	render() {
		return (
			<Jumbotron style={{margin: "auto", textAlign: "center", maxWidth: "800px"}}>
				<h1 style={{fontFamily: "Abril Fatface"}} className="display-3">grunter</h1>
			</Jumbotron>
		)
	}
}
