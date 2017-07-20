import React from 'react'
import { shallow, mount } from 'enzyme'
import UsersTable from './UsersTable'
import toJson from 'enzyme-to-json'
import Mock from './../../utils/Mock'

test('UsersTable component to match snapshot', () => {
    const component = mount(<UsersTable data={ Mock.users() }/>);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    //expect(tree.find('table')).to.have.length(1);
});
test('UsersTable component should have `table` rendered as expected', () => {
    const wrapper = mount(<UsersTable data={ Mock.users() }/>);
    expect(wrapper.find('table.table.table-bordered').exists()).toBe(true);
});