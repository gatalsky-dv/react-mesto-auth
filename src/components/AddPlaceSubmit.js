import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlaceSubmit({ isOpen, onClose, onAddPlace }) {
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	
	const handleCardNameChange = (e) => {
		setName(e.target.value);
	};
	
	const handleCardLinkChange = (e) => {
		setLink(e.target.value);
	};
	
	function handleSubmit(e) {
		e.preventDefault();
		onAddPlace({
			name,
			link,
		})
	}

	useEffect(() => {
		setName('');
		setLink('');
	}, [isOpen]);
	
	return (
		<PopupWithForm
			name="card"
			title="Новое место"
			isOpen={isOpen}
			onClose={onClose}
			buttonText="Создать"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				className="popup__input popup__input_value_title"
				id="title-input"
				name="name"
				placeholder="Название"
				required
				minLength="2"
				maxLength="30"
				value={name}
				onChange={handleCardNameChange}
			/>
			<span className="title-input-error"></span>
			<input
				type="url"
				className="popup__input popup__input_value_link"
				id="link-input"
				name="link"
				placeholder="Ссылка на картинку"
				required
				value={link}
				onChange={handleCardLinkChange}
			/>
			<span className="link-input-error"></span>
		</PopupWithForm>
	)
}