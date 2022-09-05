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

	// const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [userData, setUserData] = useState({});
	const history = useHistory();
	// const [isLiginSuccess, setIsLoginSuccess] = useState(false);

	useEffect(() => {
		let jwt = localStorage.getItem("jwt");
		if (jwt) {
			authentication(jwt);
		}
	}, [loggedIn]);

	useEffect(() => {
		if (loggedIn) {
			history.push("/");
		}
	})

	const handleLogin = () => {
		setLoggedIn(true)
	}

	const onLogin = ({ email, password }) => {
		return auth.authorize(email, password)
				.then((data) => {
					if (!data) {
						console.log("Не правильное имя пользователя или пароль");
					}
					if (data.jwt) {
						setLoggedIn(true);
						localStorage.setItem("jwt", data.jwt);
					}
				});
	};

	const onRegister = ({ email, password }) => {
		return auth.register(email, password)
			.then((res) => {
				if (!res || res.statusCode === 400) {
					console.log("Что-то пошло не так!");
				}
				if (res.jwt) {
					setLoggedIn(true);
					localStorage.setItem("jwt", res.jwt);
				}
			});
	};

	const authentication = async (jwt) => {
		auth.getContent(jwt)
		.then((res) => {
			if (res) {
				setLoggedIn(true)
				setUserData({
					email: res.email,
					password: res.password,
				});
			}
		});
	};

	const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard
	
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
		api.getUserInfo()
			.then((res) => {
				setCurrentUser(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	
	useEffect(() => {
		api.getInitialCards()
			.then((res) => {
				setCards(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	
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

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setSelectedCard(null);
	}
	
	function redirectToRegister() {
		history.push("/sign-up");
	}

	function redirectToLogin() {
		history.push("/sign-in");
	}

	function checkout() {
		localStorage.removeItem("jwt");
		history.push("/sign-in");
	}
	
	return (
		<BrowserRouter>
			<CurrentUserContext.Provider value={currentUser}>
				<div className="page">
					
					<Switch>
						<ProtectedRoute
							exact
							path="/"
							component={ Main }
							loggedIn={loggedIn}
							userData={userData}
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onEditAvatar={handleEditAvatarClick}
							onCardClick={handleCardClick}
							cards={cards}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
							onLoginClick={checkout}
						/>
						<Route exact path="/sign-up">
							<Header
								sign="Войти"
								onLoginClick={redirectToLogin}
							/>
							<Register
								signText="Регистрация"
								buttonText="Зарегистрироваться"
								onRegister={onRegister}
								// onSubmit={handleRegisterSubmit}
							/>
						</Route>
						<Route path="/sign-in">
							<Header
								sign="Регистрация"
								onLoginClick={redirectToRegister}
							/>
							<Login
								signText="Вход"
								buttonText="Войти"
								onLogin={onLogin}
							/>
						</Route>
						<Route path="*">
							{loggedIn ? (
								<Redirect to="/" />
							) : (
								<Redirect to="/sign-ip" />
							)}
						</Route>
						{/* <Route path="*">
							<NotFoundPage />
						</Route> */}
					</Switch>
	
					<InfoTooltip
						// title="Вы успешно зарегистрировались!"
						// isOpen={isInfoTooltipPopupOpen}

						// name="info"
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
		</BrowserRouter>
	);
}