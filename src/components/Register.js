import { useState } from "react";
import { Link } from 'react-router-dom';
import * as auth from "../utils/auth";

export default function Register({ signText, buttonText }) {
	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		
  };

	function handleSubmit(e) {
		e.preventDefault();
		console.dir(e);
		auth.register(email, password);
		console.log("password: ", password);
		console.log("email: ", email);
	}

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h2 className="login__text">{ signText }</h2>
			<input
				type="email"
				className="login__input login__input_value_email"
				id="email-input"
				name="email"
				placeholder="Email"
				required
				minLength="2"
				maxLength="40"
				value={email}
				onChange={handleEmailChange}
			/>
			<input
				type="password"
				className="login__input login__input_value_password"
				id="password-input"
				name="password"
				placeholder="Пароль"
				required
				minLength="2"
				maxLength="16"
				value={password}
				onChange={handlePasswordChange}
			/>
			<button
				type="submit"
				className="login__button"
			>
				{ buttonText }
			</button>
			<div className="login__question">
				<p className="login__registered">Уже зарегистрированы?</p>
				<Link
					to="/sign-in"
					className="login__redirect"
				>
					Войти
				</Link>
			</div>
		</form>
	
	
	)
}