import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

export default function InfoTooltip({ name, title, image, isOpen, onClose }) {
	const picture = image === "fail" ? fail : success;
	const altText = image === "fail" ? "Отказано в регистрации" : "Регистрация выполнена";

	return (
		<div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
			<div className="popup__container" onClick={(event) => {event.stopPropagation()}}>
				<button aria-label="Закрыть" type="button" className="popup__close popup__close_info" onClick={onClose} />
				<img src={picture} alt={altText} className="popup__union"/>
				<h3 className="popup__infotext">{title}</h3>
			</div>
		</div>
	)
}