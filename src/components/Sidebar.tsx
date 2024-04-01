import { Link } from "react-router-dom"
import { IconDashboard, IconCurrencyDollar, IconListDetails } from "@tabler/icons-react"

const Sidebar = () => {
    return (
        <div className="nav">
            {/* <div className="menu">Menu</div> */}
            <ul>
                <li><Link to="/dashboard"><IconDashboard size={'1.5em'} />Dashboard</Link></li>
                <li><Link to="" style={{ paddingRight: '60px' }}><IconCurrencyDollar size={'1.5em'} />Budget</Link></li>
                <li><Link to=""><IconListDetails size={'1.5em'} />Categories</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar