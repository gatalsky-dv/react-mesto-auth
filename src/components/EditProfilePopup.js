import {useContext, useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState('');
	const [about, setAbout] = useState('');
	
	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleAboutChange = (e) => {
		setAbout(e.target.value);
	};
	
	function handleSubmit(e) {
		e.preventDefault();
		// Передаём значения управляемых компонентов во внешний обработчик
		onUpdateUser({
			name,
			about,
		});
	}
	
	useEffect(() => {
		if (currentUser.name && currentUser.about) {
			setName(currentUser.name);
			setAbout(currentUser.about);
		}
	}, [currentUser, isOpen]);
	
	return (
		<PopupWithForm
			name="user"
			title="Редактировать профиль"
			isOpen={isOpen}
			onClose={onClose}
			buttonText="Сохранить"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				className="popup__input popup__input_value_name"
				id="name-input"
				name="name"
				placeholder="Имя позьзователя"
				required
				minLength="2"
				maxLength="40"
				value={name}
				onChange={handleNameChange}
				/>
			<span className="name-input-error"></span>
			<input
				type="text"
				className="popup__input popup__input_value_job"
				id="job-input"
				name="about"
				placeholder="О себе"
				required
				minLength="2"
				maxLength="200"
				value={about}
				onChange={handleAboutChange}
			/>
			<span className="job-input-error"></span>
		</PopupWithForm>
	)
}