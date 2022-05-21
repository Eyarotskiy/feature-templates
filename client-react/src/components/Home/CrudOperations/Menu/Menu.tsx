import React from 'react';
import crudOperationsStyles from 'components/Home/CrudOperations/CrudOperations.module.scss';
import { formatDate } from 'common/utils';
import { DishData, MenuProps } from 'common/types';

function Menu(props: MenuProps): JSX.Element {
	return (
		<table className={crudOperationsStyles.table}>
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
	)
}

export default Menu;
