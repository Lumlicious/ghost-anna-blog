import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout, HeroPostCard } from '../components/common'
import { MetaData } from '../components/common/meta'
import { DiscussionEmbed } from "disqus-react"

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
class Post extends React.Component {
    constructor(props) {
        super(props);
        this.content = React.createRef();
        this.post = this.props.data.ghostPost
    }

    

    componentDidMount() {
        // Gallery support
        this.content.current.querySelectorAll('.kg-gallery-image > img').forEach(item => {
            const container = item.closest('.kg-gallery-image')
            const width = item.attributes.width.value
            const height = item.attributes.height.value
            const ratio = width / height
            container.style.flex = ratio + ' 1 0%'
        })
    }

    render() {
        const disqusConfig = {
            shortname: 'annawaywego',
            config: { identifier: this.post.slug, title: this.post.title },
        }

        return (
            <>
                <MetaData
                    data={this.props.data}
                    location={this.props.location}
                    type="article"
                />
                <Helmet>
                    <style type="text/css">{`${this.post.codeinjection_styles}`}</style>
                </Helmet>
                <Layout>
                    <div className="post-full">
                        <article className="content grt">
    
                            <header className="post-full-header">
                                { this.post.feature_image ?
                                    <div className="hero">
                                        <HeroPostCard key={this.post.id} post={this.post} />
                                    </div> : null }
                                {/* <div Nameclass="post__hero-border"></div> */}
                            </header>
    
    
                            <section className="post-full-content" ref={this.content}>
                                <div
                                    className="post-content load-external-scripts"
                                    dangerouslySetInnerHTML={{ __html: this.post.html }}
                                />
                            </section>
                            <hr />
                        </article>
                    </div>
                    <DiscussionEmbed {...disqusConfig} />
                </Layout>
            </>
        )
    }
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            slug: PropTypes.string
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`