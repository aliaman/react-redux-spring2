import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Constants from './../../../client/utils/Constants'

export default class UsersTable extends React.Component{

    constructor(props){
        super(props)
    }

    renderShowsTotal(start, to, total) {
        return (
            <p style={ { color: 'blue' } }>
                From { start } to { to }, totals is { total }&nbsp;&nbsp;(its a customize text)
            </p>
        );
    }

    format(users){
        for(let k in users){
            if(users[k].role !=undefined) {
                users[k]['roledisplay'] = users[k].role.display;
            }
        }
        return users;
    }
    onAfterSaveCell(row, cellName, cellValue) {
        //alert(`Save cell ${cellName} with value ${cellValue}`);

        let rowStr = '';
        for (const prop in row) {
            rowStr += prop + ': ' + row[prop] + '\n';
        }
        this.props.editUser(row.id, cellName, cellValue);
        //alert('Thw whole row :\n' + rowStr);
    }
    readyForDelete(rows){

    }
    onRowSelect(row, isSelected, e) {
        let rowStr = '';
        for (const prop in row) {
            rowStr += prop + ': "' + row[prop] + '"';
        }
        console.log(e);
        alert(`is selected: ${isSelected}, ${rowStr}`);
    }
    onSelectAll(isSelected, rows) {
        alert(`is select all: ${isSelected}`);
        if (isSelected) {
            alert('Current display and selected data: ');
        } else {
            alert('unselect rows: ');
        }
        for (let i = 0; i < rows.length; i++) {
            alert(rows[i].id);
        }
    }
    render() {
        let users = this.format(this.props.data);
        let roleTypes = [];
        for(let role of Constants.ROLES){
            roleTypes.push(role.display)
        }
        const options = {
            page: 2,  // which page you want to show as default
            sizePerPageList: [ {
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: users.length
            } ], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 0, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'top'  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        };
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            unselectable: [ 1 ],
            bgColor: '#fff2fc',
            onSelect: this.onRowSelect.bind(this),
            onSelectAll: this.onSelectAll.bind(this)
        };
        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell.bind(this)
        };
        if(users!=undefined) {
            return (
                <BootstrapTable data={ users } pagination cellEdit={ cellEditProp } selectRow={ selectRowProp }>
                    <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='roledisplay' editable={ { type: 'select', options: { values: roleTypes } } }>Role</TableHeaderColumn>
                </BootstrapTable>
            );
        }else{
            return (
                <div>Empty.</div>
            )
        }
    }
}