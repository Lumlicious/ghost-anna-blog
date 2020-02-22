import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import { Navigation } from '.'

// Styles
import '../../scss/styles.scss'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass }) => {
    const site = data.allGhostSettings.edges[0].node
    // const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    // const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null
    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>
            
            <div className="viewport">

                <header className="header outer">
                    <div className="container">
                        <div className="header__content">
                            <div className="header__logo">
                                <Link to="/">
                                    {
                                        site.logo ?
                                            <img className="header__logo-image" src={site.logo} alt={site.title} /> : 
                                            <div className="header__title-text">{site.title}</div>
                                    }
                                </Link>
                            </div>
                            {/* { site.twitter && <a href={ twitterUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
                            { site.facebook && <a href={ facebookUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>} */}
                            <Navigation data={site.navigation} navClass="navigation" />
                        </div>
                    </div>
                </header>

                <main className="site-main outer">
                    <div className="container">
                        {children}
                    </div>
                </main>

                <footer className="footer">
                    <div className="container footer__content">
                        <Link to="/">{site.title}</Link> © 2020 &mdash; Created By: Lumlicious
                    </div>
                </footer>

            </div>
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
