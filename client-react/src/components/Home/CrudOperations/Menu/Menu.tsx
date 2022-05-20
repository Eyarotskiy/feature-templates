import React from 'react';
import 'components/Home/CrudOperations/Menu/Menu.scss';
import { formatDate } from 'common/utils';
import { DishData, MenuProps } from 'common/types';

function Menu(props: MenuProps): JSX.Element {
	return (
		<div className="Menu">
			<table className="table">
				<thead>
				<tr>
					<th>Dish ID</th>
					<th>Dish Creation Date</th>
					<th>Dish Name</th>
				</tr>
				</thead>
				<tbody>
				{props.menu.map((item: DishData) => (
					<tr key={item._id}>
						<td data-testid="dish-id">{item._id}</td>
						<td data-testid="dish-date">{formatDate(item.creation_date)}</td>
						<td data-testid="dish-name">{item.name}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	)
}

export default Menu;
