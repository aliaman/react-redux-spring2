import React from 'react'
import { Link } from 'react-router'

export default class LeftMenu extends React.Component {
    render() {
        return (
            <aside className="content-viewer-aside">
                <div className="content-viewer-aside-close-button"> </div>
                <nav className="portal__navigation">
                    <div className="portal__navigation-header">
                        <h1>
                            <Link to="/">Cynic</Link>
                        </h1>
                    </div>
                    <ul className="content-viewer-aside-sections">
                        <li>
                            <Link to="/">Dashboard</Link>
                            <ul className="content-viewer-aside-subsections">
                                <li>
                                    <Link to="/dash/1">Dashboard 1</Link>
                                </li>
                                <li>
                                    <Link to="/dash/2">Dashboard 2</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="content-viewer-aside-sections">
                        <li>
                            <Link to="/logout">Log Out</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        )
    }
}