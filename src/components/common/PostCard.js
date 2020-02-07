import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    return (
        <Link to={url} className="post-card">
            <div className="post-card__inside">
                <div className="post-card__media" style={{ ...post.feature_image && { backgroundImage: `url(${post.feature_image})` } }}>
                    {/* <img src={post.feature_image}></img> */}
                </div>
                <div className="post-card__content">
                    {post.tags && <div className="post-card__tag"> <Tags post={post} visibility="public" autolink={false} /></div>}
                    <h2 className="post-card__title">{post.title}</h2>
                    <div className="post-card__meta">
                        <section className="post-card__excerpt">{post.excerpt}</section>
                        <footer className="post-card__footer">
                            <div className="post-card__avatar">
                                {post.primary_author.profile_image ?
                                    <img className="author-profile-image" src={post.primary_author.profile_image} alt={post.primary_author.name}/> :
                                    <img className="default-avatar" src="/images/icons/avatar.svg" alt={post.primary_author.name}/>
                                }
                            </div>
                            <div className="post-card__footer-details">
                                <div className="post-card__author">
                                    { post.primary_author.name }
                                </div>
                                <div className="post-card__date">
                                    { post.published_at_pretty }
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
            
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
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

export default PostCard
