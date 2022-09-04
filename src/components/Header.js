

export default function Header ({ sign, email, onLoginClick }) {

  return (
    <header className="header">
      <a href="#" className="header__logo" />
      <div className="header__sign">
        <a href={`mailto:${email}`} className="header__email">{ email }</a>
        <button onClick={onLoginClick} className="header__login" >{ sign }</button>
      </div>
    </header>
  )
}