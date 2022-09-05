import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

export default function Register({ signText, buttonText, onRegister }) {
	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [message, setMessage] = useState("");
	const history = useHistory();
	const resetForm = () => {
		setEmail("");
		setPassword("");
	};

	function handleSubmit(e) {
		e.preventDefault();
		onRegister({ email, password })
			.then(resetForm)
			.then(() => {
			history.push("/");
		})
		.catch((err) => {
			console.log(err);
		})
	};

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
				onChange={(e) => setEmail(e.target.value)}
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
				onChange={(e) => setPassword(e.target.value)}
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