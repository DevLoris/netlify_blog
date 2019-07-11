import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
      let header = (
          <div>
            <h3
              style={{
                fontFamily: `Montserrat, sans-serif`,
                marginTop: 0,
              }}
            >
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to={`/`}
              >
                {title}
              </Link>
            </h3>
            <ul>
                <li>
                    <Link
                        to={`/`}
                    >
                        Accueil
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/blog/`}
                    >
                        Blog
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/jobs/`}
                    >
                        Carrières
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/contact/`}
                    >
                        Contact
                    </Link>
                </li>
                </ul>
          </div>
      )
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
          <script src={'/main.js'}></script>
      </div>
    )
  }
}

export default Layout
