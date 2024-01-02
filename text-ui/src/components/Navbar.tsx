import { Link } from "react-router-dom"

export default function Navbar () {
    return (
        <div className="header">
            <div><Link to="/"><h1>TextUI</h1></Link></div>
        </div>
    )
}