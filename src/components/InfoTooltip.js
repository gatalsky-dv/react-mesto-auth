import React from "react";

export default function InfoTooltip({ name, title, isOpen, onClose, buttonText, children, onSubmit }) {
	
	return (
		<div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
			<div className="popup__container" onClick={(event) => {event.stopPropagation()}}>
				<button aria-label="Закрыть" type="button" className="popup__close popup__close_info" onClick={onClose} />
				<div className="popup__union"/>
				<h3 className="popup__infotext">{title}</h3>
				
			</div>
		</div>
	)
}