import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

/**
* Navigation component
*
* The Navigation component takes an array of your Ghost
* navigation property that is fetched from the settings.
* It differentiates between absolute (external) and relative link (internal).
* You can pass it a custom class for your own styles, but it will always fallback
* to a `site-nav-item` class.
*
*/
class Navigation extends React.Component {
    state = {
        activeMenu: false,
    };

    handleClick = () => {
        const currentState = this.state.activeMenu
        this.setState({ activeMenu: !currentState })
    };

    render() {
        return (
            <>
                <a 
                    href="#" 
                    className={this.state.activeMenu ? `menu__button menu--active` : `menu__button`}
                    onClick={() => this.handleClick()}>
                    <span className="menu__hamburger"></span>
                </a>
                <nav 
                    className={this.state.activeMenu ? `menu__container menu--active` : `menu__container`}>
                    <ul>
                        {this.props.data.map((navItem, i) => {
                            if (navItem.url.match(/^\s?http(s?)/gi)) {
                                return <li key={i}><a className={this.props.navClass} href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">{navItem.label}</a></li>
                            } else {
                                return <li key={i}><Link className={this.props.navClass} to={navItem.url} key={i}>{navItem.label}</Link></li>
                            }
                        })} 
                    </ul>
                </nav>
            </>
        )
    }
}

Navigation.defaultProps = {
    navClass: `site-nav-item`,
}

Navigation.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    navClass: PropTypes.string,
}

export default Navigation
