import React from 'react'
import { shallow } from 'enzyme'
import Login from './Login'

test('Login component should render as expected', () => {
    const component = shallow(<Login />);
    expect(component.contains("Login")).toBe(true);
});