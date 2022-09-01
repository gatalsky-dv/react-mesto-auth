

export default function Login() {
	
	return (
		<form className="login">
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
				// value={name}
				// onChange={handleNameChange}
			/>
			<input
				type="text"
				className="login__input login__input_value_password"
				id="password-input"
				name="password"
				placeholder="Пароль"
				required
				minLength="2"
				maxLength="200"
				// value={about}
				// onChange={handleAboutChange}
			/>
			<button type="submit" className="login__button">Войти</button>
		</form>
		
		
	)
}