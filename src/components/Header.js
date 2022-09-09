import { Link, Route, Switch } from "react-router-dom";

export default function Header ({ email, onLoginClick }) {

  return (
    <header className="header">
      <a href="#" className="header__logo" />
      <div className="header__sign">
        <a href={`mailto:${email}`} className="header__email">{ email }</a>
        <Switch>
          <Route exact path="/">
            <Link to="/sign-in" className="header__login" onClick={onLoginClick}>Выйти</Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__login" >Войти</Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__login" >Регистрация</Link>
          </Route>
        </Switch>
      </div>
    </header>
  )
}