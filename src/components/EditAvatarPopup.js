import {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const avatarRef = useRef();
	
	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar({
			avatar: avatarRef.current.value,
		});
		avatarRef.current.value = '';
	}
	
	return (
		<PopupWithForm
			name="avatar"
			title="Обновить аватар"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			buttonText="Сохранить"
		>
			<input
				type="url"
				className="popup__input popup__input_value_link"
				id="avatar-input"
				name="avatar"
				placeholder="Ссылка на аватарку"
				required
				ref={avatarRef}
			/>
			<span className="avatar-input-error"></span>
		</PopupWithForm>
	)
	
}