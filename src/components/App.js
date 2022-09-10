import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, useHistory, Redirect } from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlaceSubmit";

export default function App() {
	
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);

	const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [image, setImage] = useState("");
	const [text, setText] = useState("");

	useEffect(() => {
		let token = localStorage.getItem("token");
		if (token) {
			authentication(token);
		}
	}, [loggedIn]);

	useEffect(() => {
		if (loggedIn) {
			history.push("/");
		}
	}, [history, loggedIn]);

	const onLogin = async ({ email, password }) => {
		return auth
			.authorize(email, password)
			.then((data) => {
				if (data.token) {
					setLoggedIn(true);
					history.push("/");
					setEmail(email);
					localStorage.setItem("token", data.token);
				}
			})
			.catch(() => {
				registerFail();
				setText("Неправильный email или пароль");
			})
	};

	const onRegister = async ({ email, password }) => {
		return auth.register(email, password)
			.then((res) => {
					if (res) {
						registerSuccess();
						history.push("/sign-in");
						setText("Вы успешно зарегистрировались!");
					}
			})
			.catch(() => {
				registerFail();
				setText("Что-то пошло не так! Попробуйте ещё раз.");
			})
	};

	const authentication = async (token) => {
		auth.getContent(token)
		.then((res) => {
			if (res) {
				setLoggedIn(true);
				setEmail(res.data.email);
			}
		})
		.catch((err) => {
			console.log(err);
		});
	};

	const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoTooltipPopupOpen;
	
	useEffect(() => {
		function closeByEscape(e) {
			if(e.key === "Escape") {
				closeAllPopups();
			}
		}
		if(isOpen) {
			document.addEventListener("keydown", closeByEscape);
			return () => {
				document.removeEventListener("keydown", closeByEscape);
			}
		}
	}, [isOpen]);

	useEffect(() => {
		if (loggedIn) {
			api.getUserInfo()
				.then((res) => {
					setCurrentUser(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [loggedIn]);
	
	useEffect(() => {
		if (loggedIn) {
			api.getInitialCards()
				.then((res) => {
					setCards(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [loggedIn]);
	
	function handleCardLike(card) {
		// снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some( i => i._id === currentUser._id );
		
		// отправляем запрос в API и получаем обновленные данные карточки
		api.showLikesCard(card._id, isLiked)
			.then((newCard) => { //форматируем новый массив на основе имеющегося, подставляя в него новую карточку
				const newCards = cards.map((c) => c._id === card._id ? newCard : c);
				//обновляем стейт
				setCards(newCards);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	
	function handleCardDelete(cardId) {
		api.deleteCard(cardId._id)
			.then((res) => {
				setCards(cards.filter(card => card._id !== cardId._id))
			})
			.catch((err) => {
				console.log(err);
			});
	}
	
	function handleUpdateUser({name, about}) {
		api.editProfile({name, about})
			.then((res) => {
				setCurrentUser(res);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
	}
	
	function handleUpdateAvatar(avatar) {
		api.updateAvatar(avatar)
			.then((res) => {
				setCurrentUser(res);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
	}

	function handleAddPlaceSubmit(name, link) {
		api.addNewCard(name, link)
			.then((res) => {
				setCards([res, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
	}
	
	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}
	
	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}
	
	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}
	
	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function registerSuccess() {
		setImage("success");
		setIsInfoTooltipPopupOpen(true);
	}

	function registerFail() {
		setImage("fail");
		setIsInfoTooltipPopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsInfoTooltipPopupOpen(false);
		setSelectedCard(null);
	}
	
	function onSignOut() {
		localStorage.removeItem("token");
		setEmail("");
		history.push("/sign-in");
	}

	return (
			<CurrentUserContext.Provider value={currentUser}>
				<div className="page">
				<Header
								email={email}
								onLoginClick={onSignOut}
							/>
					<Switch>
						<ProtectedRoute
							exact
							path="/"
							component={ Main }
							loggedIn={loggedIn}
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onEditAvatar={handleEditAvatarClick}
							onCardClick={handleCardClick}
							cards={cards}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
						/>
						<Route path="/sign-in">
							<Login
								onLogin={onLogin}
							/>
						</Route>
						<Route path="/sign-up">
							<Register
								onRegister={onRegister}
							/>
						</Route>
						<Route path="*">
							{loggedIn ? (
								<Redirect to="/" />
							) : (
								<Redirect to="/sign-in" />
							)}
						</Route>
					</Switch>
	


					<InfoTooltip
						title={text}
						image={image}
						isOpen={isInfoTooltipPopupOpen}
						onClose={closeAllPopups}
						name="info"
					/>
					
					<Footer/>
					
					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
					/>
					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlaceSubmit}
					/>
					
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
					/>
	
					<PopupWithForm
						name="confirmation"
						title="Вы уверены?"
					/>
					<ImagePopup
						name="image"
						card={selectedCard}
						isOpen={!!selectedCard}
						onClose={closeAllPopups}
					/>
				</div>
			</CurrentUserContext.Provider>
	);
}