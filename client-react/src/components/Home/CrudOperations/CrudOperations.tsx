import React, {useEffect, useState} from 'react';
import appStyles from 'components/App/App.module.scss';
import styles from 'components/Home/CrudOperations/CrudOperations.module.scss';
import Menu from 'components/Home/CrudOperations/Menu/Menu';
import Users from 'components/Home/CrudOperations/Users/Users';
import WebSocket from 'Api/WebSocket';
import Api from 'Api/Api';
import { selectUsers, setUsers } from 'redux/slices/usersSlice';
import { DishData } from 'common/types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import classNames from 'classnames';

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
		<section>
			<h2 className={classNames(appStyles.title, appStyles['mb-0'])}>CRUD operations</h2>
			<div className={styles.container}>
				<div className={styles['container-wrapper']}>
					<h3 className={appStyles.subtitle}>REST API</h3>
					<button className={classNames(appStyles.button, appStyles['button-blue'])} onClick={getData}>
						Get users (external API request)
					</button>
					<Users users={users} />
				</div>
				<div className={styles['container-wrapper']}>
					<h3 className={appStyles.subtitle}>Websocket</h3>
					<button className={classNames(appStyles.button, appStyles['button-blue'])} onClick={getMenu}>
						Get menu (from application  DB)
					</button>
					<Menu menu={menu} />
					<div className={styles['form-wrapper-single']}>
						<button className={classNames(appStyles.button, appStyles['button-blue'])} onClick={clearMenu}>
							Clear menu
						</button>
					</div>
					<div className={styles['form-wrapper']}>
						<div className={styles['form-container']}>
							<input
								className={styles['form-input']}
								placeholder="Dish name"
								type="text"
								value={dishCreateName}
								onChange={(e) => setDishCreateName(e.target.value)}
							/>
							<button className={classNames(appStyles.button, appStyles['button-blue'])} onClick={saveDish}>
								Save dish
							</button>
						</div>
						<div className={styles['form-container']}>
							<input
								className={styles['form-input']}
								placeholder="Dish name"
								type="text"
								value={dishDeleteName}
								onChange={(e) => setDishDeleteName(e.target.value)}
							/>
							<button className={classNames(appStyles.button, appStyles['button-blue'])} onClick={deleteDish}>
								Delete dish
							</button>
						</div>
						<div className={styles['form-container']}>
							<input
								className={styles['form-input']}
								placeholder="Dish name"
								type="text"
								value={dishOldUpdateName}
								onChange={(e) => setDishOldUpdateName(e.target.value)}
							/>
							<input
								className={styles['form-input']}
								placeholder="New dish name"
								type="text"
								value={dishNewUpdateName}
								onChange={(e) => setDishNewUpdateName(e.target.value)}
							/>
							<button className={classNames(appStyles.button, appStyles['button-blue'])} onClick={updateDish}>
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
