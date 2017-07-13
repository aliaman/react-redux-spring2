import React from 'react';
import LeftMenu from '../LeftMenu/LeftMenu'
import Authorization from '../../utils/Authorization'

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    render() {
        return (
            <div>
                <div className="content-viewer-container ng-scope">
                    <LeftMenu />
                    <div className="content-viewer ng-scope symScroll-uxtookit is--index">
                        <section className="guide-section is--default ng-scope">
                            {this.props.children}
                        </section>
                    </div>
                    <div className="content-viewer-editor is--closed"> </div>
                </div>
            </div>
        );
    }
}
export default Authorization(App)