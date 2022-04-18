import React, {useEffect, useState} from 'react';
import 'components/Home/CrudOperations/CrudOperations.scss';
import Menu from 'components/Home/CrudOperations/Menu/Menu';
import Users from 'components/Home/CrudOperations/Users/Users';
import WebSocket from 'Api/WebSocket';
import Api from 'Api/Api';
import {useDispatch, useSelector} from 'react-redux';
import {setUsers} from 'redux/actions/actions';
import {DishData, ReduxState} from 'common/types';

function CrudOperations(): JSX.Element {
	const [dishCreateName, setDishCreateName] = useState('');
	const [dishDeleteName, setDishDeleteName] = useState('');
	const [dishOldUpdateName, setDishOldUpdateName] = useState('');
	const [dishNewUpdateName, setDishNewUpdateName] = useState('');
	const [menu, setMenu] = useState([] as DishData[]);
	const users = useSelector((state: ReduxState) => state.userReducer.users);
	const dispatch = useDispatch();

	useEffect(() => {
		WebSocket.getMenu(setMenu)
	}, []);

	function handleDishCreateNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setDishCreateName(e.target.value);
	}

	function handleDishDeleteNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setDishDeleteName(e.target.value);
	}

	function handleDishOldUpdateNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setDishOldUpdateName(e.target.value);
	}

	function handleDishNewUpdateNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setDishNewUpdateName(e.target.value);
	}

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
					<button className="btn btn-blue" onClick={getData}>
						Get users (external API request)
					</button>
					<Users users={users} />
				</div>
				<div className="container-wrapper">
					<h3 className="subtitle">Websocket</h3>
					<button className="btn btn-blue" onClick={getMenu}>
						Get menu (from application  DB)
					</button>
					<Menu menu={menu} />
					<div className="form-wrapper-single">
						<button className="btn btn-blue" onClick={clearMenu}>
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
								onChange={handleDishCreateNameChange} />
							<button className="btn btn-blue" onClick={saveDish}>
								Save dish
							</button>
						</div>
						<div className="form-container">
							<input
								className="form-input"
								placeholder="Dish name"
								type="text"
								value={dishDeleteName}
								onChange={handleDishDeleteNameChange} />
							<button className="btn btn-blue" onClick={deleteDish}>
								Delete dish
							</button>
						</div>
						<div className="form-container">
							<input
								className="form-input"
								placeholder="Dish name"
								type="text"
								value={dishOldUpdateName}
								onChange={handleDishOldUpdateNameChange} />
							<input
								className="form-input"
								placeholder="New dish name"
								type="text"
								value={dishNewUpdateName}
								onChange={handleDishNewUpdateNameChange} />
							<button className="btn btn-blue" onClick={updateDish}>
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
