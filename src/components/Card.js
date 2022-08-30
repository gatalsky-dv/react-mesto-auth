import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
	
	const currentUser = useContext(CurrentUserContext);
	const likes = card.likes.map((item) => item._id);
	
	//определяем, являемся ли мы владельцем текущей карточки
	const isOwn = card.owner._id === currentUser._id;
	
	//создаем переменную, которую после зададим в className для кнопки удаления
	const cardDeleteButtonClassName = (
		`card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
	);
	
	//определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked = card.likes.some( i => i._id === currentUser._id );
	
	//создаем переменную, которую после зададим в className для кнопки лайка
	const cardLikeButtonlassName = `...`;
	
	function handleClick() {
		onCardClick(card);
	}
	
	function handleLikeClick() {
		onCardLike(card, isLiked);
	}
	
	function handleDeleteClick() {
		onCardDelete(card, isOwn);
	}
	
	return (
		<article className="element">
			<img src={card.link} alt={card.name} className="element__maskgroup" onClick={handleClick} />
			<button type="button" className={`element__trash ${isOwn ? '' : 'element__trash_disabled'}`} onClick={handleDeleteClick} ></button>
			<div className="element__caption">
				<h2 className="element__name">{card.name}</h2>
				<div className="element__likes">
					<button type="button" className={`element__heart ${isLiked ? 'element__heart_active' : ''}`} onClick={handleLikeClick} ></button>
					<p className="element__counter">{likes.length}</p>
				</div>
			</div>
		</article>
	)
}

