import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const Page = ({ data, location }) => {
    const page = data.ghostPage

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
            />
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="post-full">
                    <article className="content grt">
                        <header className="post-full-header">
                            { page.feature_image ?
                                <div className="hero">
                                    <img src="page.feature_image"></img>
                                </div> : null }
                            {/* <div Nameclass="post__hero-border"></div> */}
                        </header>
                        <section className="post-full-content">
                            <h1 className="content-title">{page.title}</h1>
                            <div
                                className="post-content load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: page.html }}
                            />
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
}

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Page

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`
