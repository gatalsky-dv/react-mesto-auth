import React from "react";

export default function ImagePopup({ name, card, isOpen, onClose }) {

	return (
		<div className={`popup popup_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
			<div className="popup__pic" onClick={(event) => {event.stopPropagation()}}>
				<button aria-label="Закрыть" type="button" className={`popup__close popup__close_${name}`} onClick={onClose} ></button>
				<img src={card?.link} alt={card?.name} className="popup__img" />
				<p className="popup__text">{card?.name}</p>
			</div>
		</div>
	)
}