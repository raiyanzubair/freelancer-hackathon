import React from 'react'
import { Table } from 'reactstrap'

export default class JobTable extends React.Component {
	render() {
		const {projects} = this.props
		return (
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>Provider</th>
						<th>Project</th>
						<th>Description</th>
						<th>Language</th>
						<th>Link</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((item,index) => {
						console.log(item)
						return(
							<tr key={index}>
								<th scope="row">{index}</th>
								<td>{item.provider}</td>
								<td>{item.name}</td>
								<td>{item.description}</td>
								<td>{item.language}</td>
								<td>{item.url}</td>
							</tr>
						)
					})
					}
				</tbody>
			</Table>
		)
	}
}