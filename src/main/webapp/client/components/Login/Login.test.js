import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Login from './Login'

test('Login component should have login heading', () => {
    const component = shallow(<Login />);
    expect(component.contains("Login")).toBe(true);
});
test('Login component should render as expected', () => {
    const component = shallow(<Login />);
    const tree = toJson(component);
    //
    expect(tree).toMatchSnapshot();
});