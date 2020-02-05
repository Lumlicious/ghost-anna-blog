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
            <div className="hero-post-card__media" style={{ ...post.feature_image && { backgroundImage: `url(${post.feature_image})` } }}>
                {/* <img src={post.feature_image}></img> */}
            </div>
            <div className="hero-post-card__content">
                <h2 className="hero-post-card__title">{post.title}</h2>
                <div className="hero-post-card__meta">
                    {/* <div className="hero-post-card__avatar">
                            {post.primary_author.profile_image ?
                                <img className="author-profile-image" src={post.primary_author.profile_image} alt={post.primary_author.name}/> :
                                <img className="default-avatar" src="/images/icons/avatar.svg" alt={post.primary_author.name}/>
                            }
                    </div> */}
                    <div className="hero-post-card__author">
                        { post.primary_author.name }
                    </div>
                    <div className="hero-post-card__date">
                        { post.published_at_pretty }
                    </div>
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
