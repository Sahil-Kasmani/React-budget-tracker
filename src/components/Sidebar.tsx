import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faDashboard, faLayerGroup } from '@fortawesome/free-solid-svg-icons'


interface prop {
    isToggle: string | null;
}

const Sidebar = ({ isToggle }: prop) => {
    return (
        <div className={`sidebar ${isToggle}`}>
            <li><FontAwesomeIcon icon={faChartPie} /><Link style={{ fontWeight: "300" }} to="/dashboard">Dashboard</Link></li>
            <li><FontAwesomeIcon icon={faDashboard} /><Link style={{ fontWeight: "300" }} to="">Budget</Link></li>
            <li><FontAwesomeIcon icon={faLayerGroup} /><Link style={{ fontWeight: "300" }} to="">Categories</Link></li>
        </div>
    )
}

export default Sidebar