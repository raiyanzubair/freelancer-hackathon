import React from 'react'
import { Jumbotron, Row, Col } from 'reactstrap' 

export default class Header extends React.Component {
	render() {
		return (
			<Jumbotron style={{margin: "auto", textAlign: "center", maxWidth: "800px"}}>
				<Row>
					<Col>
						<h1>JUMP</h1>
					</Col>
					<Col>
						<h1>STARTED</h1>
					</Col>
					<Col>
						<h1>JOBS</h1>
					</Col>
				</Row>
			</Jumbotron>
		)
	}
}
