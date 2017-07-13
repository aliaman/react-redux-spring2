import React from 'react'
import { shallow } from 'enzyme'
import Dashboard from './Dashboard'

test('Dashboard component should render as expected', () => {
    const component = shallow(<Dashboard/>);
});