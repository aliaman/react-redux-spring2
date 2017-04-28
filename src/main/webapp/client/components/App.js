import React from 'react';
import { connect } from 'react-redux'
import { fetchUsers } from './../redux/actions/userActions'
import LeftMenu from './LeftMenu'


@connect((store) => {
    return {
        users: store.user.users
    }
})
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(fetchUsers());
    }
    render() {
        console.log(this.props.users);
        const userlist = this.props.users.map(function(user){
           return (
               <li key={Math.random()}>{user.name} - {user.salary}</li>
           )
        });
        return (
            <div>
                <div className="content-viewer-container ng-scope">
                    <LeftMenu />
                    <div className="content-viewer ng-scope symScroll-uxtookit is--index">
                        <section className="guide-section is--default ng-scope">
                            userList:
                            <ul>{userlist}</ul>
                            {this.props.children}
                        </section>
                    </div>
                    <div className="content-viewer-editor is--closed"> </div>
                </div>
            </div>
        );
    }
}
