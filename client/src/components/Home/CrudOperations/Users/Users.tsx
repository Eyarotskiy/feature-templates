import React from 'react';
import 'components/Home/CrudOperations/Menu/Menu.scss';
import {UserData, UsersProps} from 'common/types';

function Users(props: UsersProps): JSX.Element {
	return (
		<div className="Users">
			<table className="table">
				<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Username</th>
					<th>Website</th>
				</tr>
				</thead>
				<tbody>
				{props.users.map((user: UserData) => (
					<tr key={user.id}>
						<td data-testid="user-id">{user.id}</td>
						<td data-testid="user-name">{user.name}</td>
						<td data-testid="user-username">{user.username}</td>
						<td data-testid="user-website">{user.website}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	)
}

export default Users;
