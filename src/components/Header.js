import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header ({ sign, email, onLoginClick }) {

  return (
    <header className="header">
      <a href="#" className="header__logo" />
      <div className="header__sign">
        <a href={`mailto:${email}`} className="header__email">{ email }</a>
        <Link
					className="header__login"
          to={(e) => sign === "Регистрация" ? "/sign-up" : "/sign-in"}
				>
					{ sign }
				</Link>
        {/* <button onClick={onLoginClick} className="header__login" >{ sign }</button> */}
      </div>
    </header>
  )
}