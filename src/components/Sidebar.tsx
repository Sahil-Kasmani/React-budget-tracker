import { Link } from "react-router-dom"

const Sidebar = () => {
    return (
        <div className="nav">
            {/* <div className="menu">Menu</div> */}
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="">Budget</Link></li>
                <li><Link to="">Categories</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar