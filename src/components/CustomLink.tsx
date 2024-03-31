import PropTypes from "prop-types"
import {Link, useLocation} from "react-router-dom"

const CustomLink = ({children, to}: { children: PropTypes.ReactNodeLike, to: string }) => {

    const location = useLocation()
    const match = location.pathname === to

    return (
        <Link className={match ? "nav-link active" : "nav-link"} to={to}>{children}</Link>
    )
}

CustomLink.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired
}

export default CustomLink