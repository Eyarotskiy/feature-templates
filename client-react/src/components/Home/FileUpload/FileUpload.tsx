import React, { useState } from 'react';
import axios from 'axios';
import styles from 'components/Home/FileUpload/FileUpload.module.scss';
import appStyles from 'components/App/App.module.scss';
import classNames from 'classnames';

function FileUpload(): JSX.Element {
	const [file, setFile] = useState<File>();
	const [fileName, setFileName] = useState('');
	const [imageUrl, setImageUrl] = useState('');

	function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files![0];
		setFile(e.target.files![0]);
		setFileName(file.name);
	}

	async function uploadFile(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
		event.preventDefault();
		try {
			if (!file) return;

			const data = new FormData();
			data.append('file', file);
			const response = await axios.post('/api/file/upload', data);
			setImageUrl(response.data.url);
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className={styles.FileUpload}>
			<h2 className={appStyles.title}>File Upload</h2>
			<form className={styles.form}>
				<label htmlFor="upload-input" className={classNames(appStyles.button, appStyles['button-blue'])}>
					Select file to upload
				</label>
				<h4 className={styles['file-name']}>{fileName}</h4>
				<input
					id="upload-input"
					data-testid="upload-input"
					style={{display: 'none'}}
					type="file"
					onChange={handleFileUpload}
				/>
				{
					fileName.length > 0 &&
					<button
						data-testid="upload-button"
						className={classNames(appStyles.button, appStyles['button-blue'])}
						onClick={uploadFile}
					>
						Upload file to server
					</button>
				}
				{
					imageUrl.length > 0 &&
					<img
						alt="uploaded"
						className={styles.uploadedImage}
						data-testid="uploaded-image"
						src={imageUrl}
					/>
				}
			</form>
		</div>
	);
}

export default FileUpload;
