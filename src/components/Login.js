import { useState } from "react";

export default function Login({ onLogin }) {
	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const resetForm = () => {
		setEmail("");
		setPassword("");
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!email || !password) {
			return;
		} 
		onLogin({ email, password })
			.then(resetForm)
	};

	return (
		<form className="login" onSubmit={handleSubmit} >
			<h2 className="login__text">Вход</h2>
			<input
				type="text"
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
				maxLength="200"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" className="login__button" >Войти</button>
		</form>
	)
}