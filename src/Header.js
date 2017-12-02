import React from 'react'
import { Jumbotron } from 'reactstrap' 
import { BLUE_BORDER } from './consts'

export default class Header extends React.Component {
	render() {
		return (

			<Jumbotron style={{background:BLUE_BORDER, backgroundImage: `url("table-blur.jpg")`, backgroundSize: 'cover', margin: "auto", textAlign: "center", maxWidth: "800px"}}>
				<h1 style={{color: "white", fontFamily: "Lato, Sans-serif", fontWeight: "900"}} className="display-3">Occupo</h1>
			</Jumbotron>
		)
	}
}
