import React from 'react'
import { Link } from 'react-router'
import ls from 'localstorage-ttl'

export default class LeftMenu extends React.Component {
    constructor(){
        super();
    }
    componentWillMount(){
        let userObj = ls.get("auth");
        userObj = JSON.parse(userObj);
        this.setState({role: userObj.role.name});
    }
    allowedFor(allowedRoles = []){
        return allowedRoles.includes(this.state.role);
    }
    render() {
        return (
            <aside className="content-viewer-aside">
                <div className="content-viewer-aside-close-button"> </div>
                <nav className="portal__navigation">
                    <div className="portal__navigation-header">
                        <h1>
                            <Link to="/">
                                <span className="cynic-logo" />
                                <span className="cynic-title">Cynic</span>
                            </Link>
                        </h1>
                    </div>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    { this.allowedFor(["ADMINISTRATOR"]) ?
                        <ul className="content-viewer-aside-sections">
                            <li>
                                <Link to="/">Administration</Link>
                                <ul className="content-viewer-aside-subsections">
                                    { this.allowedFor(["ADMINISTRATOR"]) ? <li><Link to="/um"><span className="overflow-ellipses">User Management</span></Link></li> : null }
                                </ul>
                            </li>
                        </ul>
                        : null }

                    { this.allowedFor(["ADMINISTRATOR", "ANALYST", "REPORTING"]) ?
                        <ul className="content-viewer-aside-sections">
                            <li>
                                <Link to="/">Dashboard</Link>
                                <ul className="content-viewer-aside-subsections">
                                    { this.allowedFor(["ADMINISTRATOR", "ANALYST", "REPORTING"]) ? <li><Link to="/dash/1"><span className="overflow-ellipses">Cynic Efficacy Metrics</span></Link></li> : null }
                                    { this.allowedFor(["ADMINISTRATOR", "ANALYST"]) ? <li><Link to="/dash/2"><span className="overflow-ellipses">FN sample hash tracking</span></Link></li> : null }
                                    { this.allowedFor(["ADMINISTRATOR", "ANALYST"]) ? <li><Link to="/dash/3"><span className="overflow-ellipses">FP sample hash tracking</span></Link></li> : null }
                                </ul>
                            </li>
                        </ul>
                        : null }

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