import { useContext } from "react";
import Card from "./Card"
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardLike, onCardDelete, cards }) {
	
	const currentUser = useContext(CurrentUserContext);
	
	return (
		<main className="content">
			
			<section className="profile">
				<div className="profile__avatar" onClick={onEditAvatar}>
					<div style={{ backgroundImage: `url(${currentUser?.avatar})`}} className="profile__image"/>
				</div>
				<div className="profile__form">
					<div className="profile__info">
						<h1 className="profile__name">{currentUser?.name}</h1>
						<button aria-label="Редактировать" type="button" className="profile__edit" onClick={onEditProfile}></button>
					</div>
					<p className="profile__description">{currentUser?.about}</p>
				</div>
				<button aria-label="Добавить" type="button" className="profile__add" onClick={onAddPlace}>
				</button>
			</section>
			
			<section className="elements">
				{cards?.map((card) => {
					return (
						<Card
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							onCardDelete={onCardDelete}
							key={card._id}
							card={card}
						/>
					)
				})}
			</section>
		
		</main>
	)
}