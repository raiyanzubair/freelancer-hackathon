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
						<th>Provider</th>
						<th>Project</th>
						<th>Description</th>
						<th>Language</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((item,index) => {
						return(
							<tr key={index}>
								<th scope="row">{index}</th>
								<td>{item.provider}</td>
								<td><a href={item.url}>{item.name}</a></td>
								<td>{item.description}</td>
								<td>{item.language}</td>
							</tr>
						)
					})
					}
				</tbody>
			</Table>
		)
	}
}
