import React, {useEffect, useState} from 'react';
import 'components/Home/CrudOperations/CrudOperations.scss';
import Menu from 'components/Home/CrudOperations/Menu/Menu';
import Users from 'components/Home/CrudOperations/Users/Users';
import WebSocket from 'Api/WebSocket';
import Api from 'Api/Api';
import { selectUsers, setUsers } from 'redux/slices/usersSlice';
import { DishData } from 'common/types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

function CrudOperations(): JSX.Element {
	const [dishCreateName, setDishCreateName] = useState('');
	const [dishDeleteName, setDishDeleteName] = useState('');
	const [dishOldUpdateName, setDishOldUpdateName] = useState('');
	const [dishNewUpdateName, setDishNewUpdateName] = useState('');
	const [menu, setMenu] = useState([] as DishData[]);
	const users = useAppSelector(selectUsers);
	const dispatch = useAppDispatch();

	useEffect(() => {
		WebSocket.getMenu(setMenu)
	}, []);

	function clearMenu() {
		WebSocket.clearMenu();
	}

	function saveDish() {
		WebSocket.saveDish(dishCreateName);
	}

	function updateDish() {
		const payload = {
			oldDishName: dishOldUpdateName,
			newDishName: dishNewUpdateName,
		};
		WebSocket.updateDish(payload);
	}

	function deleteDish() {
		WebSocket.deleteDish(dishDeleteName)
	}

	async function getData() {
		const response = await Api.getData();
		dispatch(setUsers(response.data));
	}

	async function getMenu() {
		const response = await Api.getMenu();
		setMenu(response.data);
	}

	return (
		<section className="CrudOperations">
			<h2 className="title mb-0">CRUD operations</h2>
			<div className="container">
				<div className="container-wrapper">
					<h3 className="subtitle">REST API</h3>
					<button className="button button-blue" onClick={getData}>
						Get users (external API request)
					</button>
					<Users users={users} />
				</div>
				<div className="container-wrapper">
					<h3 className="subtitle">Websocket</h3>
					<button className="button button-blue" onClick={getMenu}>
						Get menu (from application  DB)
					</button>
					<Menu menu={menu} />
					<div className="form-wrapper-single">
						<button className="button button-blue" onClick={clearMenu}>
							Clear menu
						</button>
					</div>
					<div className="form-wrapper">
						<div className="form-container">
							<input
								className="form-input"
								placeholder="Dish name"
								type="text"
								value={dishCreateName}
								onChange={(e) => setDishCreateName(e.target.value)}
							/>
							<button className="button button-blue" onClick={saveDish}>
								Save dish
							</button>
						</div>
						<div className="form-container">
							<input
								className="form-input"
								placeholder="Dish name"
								type="text"
								value={dishDeleteName}
								onChange={(e) => setDishDeleteName(e.target.value)}
							/>
							<button className="button button-blue" onClick={deleteDish}>
								Delete dish
							</button>
						</div>
						<div className="form-container">
							<input
								className="form-input"
								placeholder="Dish name"
								type="text"
								value={dishOldUpdateName}
								onChange={(e) => setDishOldUpdateName(e.target.value)}
							/>
							<input
								className="form-input"
								placeholder="New dish name"
								type="text"
								value={dishNewUpdateName}
								onChange={(e) => setDishNewUpdateName(e.target.value)}
							/>
							<button className="button button-blue" onClick={updateDish}>
								Update dish
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CrudOperations;
