import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faDashboard, faLayerGroup } from '@fortawesome/free-solid-svg-icons'


interface prop {
    isToggle: string | null;
}

const Sidebar = ({ isToggle }: prop) => {
    const details = [
        { icon: faChartPie, link: "/dashboard", text: "Dashboard" },
        { icon: faDashboard, link: "", text: "Budget" },
        { icon: faLayerGroup, link: "", text: "Categories" }]


    return (
        <div className={`sidebar ${isToggle}`}>
            {details.map((item, index) => (
                <li key={index}>
                    <FontAwesomeIcon icon={item.icon} />
                    <Link style={{ fontWeight: "300" }} to={item.link}>{item.text}</Link>
                </li>
            ))}
        </div>
    )
}

export default Sidebar