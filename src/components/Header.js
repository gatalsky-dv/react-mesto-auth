

export default function Header ({ sign, email }) {

  return (
    <header className="header">
      <a href="#" className="header__logo" />
      <a href={`mailto:${email}`} className="header__email">{ email }</a>
      <a href="#" className="header__login" >{ sign }</a>
    </header>
  )
}