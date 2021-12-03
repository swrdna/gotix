import Link from 'next/link'

const Header = ({ currentUser }) => {
  const links = [
    { label: 'Home', href: '/' },
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
  .filter(linkConf => linkConf)
  .map(({ label, href }) =>
    <li key={href} className="nav-items">
      <Link href={href}>
        <a className="nav-link">{label}</a>
      </Link>
    </li>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand fw-bold">GoTix</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavba" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            { links }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
