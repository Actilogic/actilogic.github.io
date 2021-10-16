import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import * as footerStyles from "../styles/footer.module.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          copyright
        }
      }
    }
  `)

  return (
    <footer className={footerStyles.footer}>
      <p>
        {data.site.siteMetadata.title + " " + data.site.siteMetadata.copyright}
      </p>
    </footer>
  )
}

export default Footer
