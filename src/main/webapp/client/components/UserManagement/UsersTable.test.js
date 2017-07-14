import React from 'react'
import { shallow, mount } from 'enzyme'
import UsersTable from './UsersTable'
import toJson from 'enzyme-to-json'

test('UsersTable component to match snapshot', () => {
    const component = mount(<UsersTable data={ users }/>);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    //expect(tree.find('table')).to.have.length(1);
});
test('UsersTable component should have `table` rendered as expected', () => {
    const wrapper = mount(<UsersTable data={ users }/>);
    expect(wrapper.find('table.table.table-bordered').exists()).toBe(true);
});

let users = [
    {
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },
    {
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    }
];