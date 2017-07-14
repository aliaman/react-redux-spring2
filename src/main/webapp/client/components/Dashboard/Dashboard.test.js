import React from 'react'
import { shallow } from 'enzyme'
import Dashboard from './Dashboard'
import toJson from 'enzyme-to-json'

test('Dashboard component should render as expected', () => {
    const component = shallow(<Dashboard/>);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});