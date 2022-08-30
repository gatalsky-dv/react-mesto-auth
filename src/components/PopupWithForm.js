import React from "react";

export default function PopupWithForm({ name, title, isOpen, onClose, buttonText, children, onSubmit }) {

	return (
		<div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
			<div className='popup__container' onClick={(event) => {event.stopPropagation()}}>
				<button aria-label="Закрыть" type="button" className={`popup__close popup__close_${name}`} onClick={onClose} />
				<h3 className="popup__title">{title}</h3>
				<form name={name} className={`popup__form popup__form_${name}`} noValidate onSubmit={onSubmit} >
					{children}
					<button type="submit" className="popup__button">{buttonText}</button>
				</form>
			</div>
		</div>
	)
}