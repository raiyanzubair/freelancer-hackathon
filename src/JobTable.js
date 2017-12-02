import React from 'react'
import { Table } from 'reactstrap'

export default class JobTable extends React.Component {
	render() {
		const {projects} = this.props
		return (
			<Table style={{ backgroundColor: "white", width: "85%", marginLeft: "auto", marginRight: "auto", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} >
				<thead>
					<tr>
						<th>#</th>
						<th>Job</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((item,index) => {
						return(
							<tr key={index}>
								<th scope="row">{index}</th>
								<td><a href={item.link}>{item.title}</a></td>
								<td>{item.description}</td>
							</tr>
						)
					})
					}
				</tbody>
			</Table>
		)
	}
}
