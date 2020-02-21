import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

const HeroPostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    return (
        <Link to={url} className="hero-post-card">
            <div className="hero-post-card__media" style={{ ...post.feature_image && { backgroundImage: `url(${post.feature_image})` } }}></div>
            <div className="hero-post-card__content">
            {post.tags && <div className="post-card__tag"> <Tags post={post} visibility="public" autolink={false} /></div>}
                <h2 className="hero-post-card__title">{post.title}</h2>
                <div className="hero-post-card__meta">
                    <section className="hero-post-card__excerpt">{post.excerpt}</section>
                    <footer className="hero-post-card__footer">
                        
                        <div className="hero-post-card__avatar">
                            {post.primary_author.profile_image ?
                                <div className="hero-post-card__avatar-image" style={{ backgroundImage: `url(${post.primary_author.profile_image})` }} alt={post.primary_author.name}/> :
                                <img className="default-avatar" src="/images/icons/avatar.svg" alt={post.primary_author.name}/>
                            }
                        </div>
                        <div className="hero-post-card__footer-details">
                            <div className="hero-post-card__author">
                                { post.primary_author.name }
                            </div>
                            <div className="hero-post-card__date">
                                { post.published_at_pretty }
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </Link>
    )
}

HeroPostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        published_at_pretty: PropTypes.string,
        published_at: PropTypes.string,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default HeroPostCard
