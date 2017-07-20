import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Constants from '../../../../utils/Constants'

export default class HashTracking extends React.Component{

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
    onAfterSaveCell(row, cellName, cellValue) {
        //alert(`Save cell ${cellName} with value ${cellValue}`);

        let rowStr = '';
        for (const prop in row) {
            rowStr += prop + ': ' + row[prop] + '\n';
        }
        this.props.editUser(row.id, cellName, cellValue);
        //alert('Thw whole row :\n' + rowStr);
    }
    onRowSelect(row, isSelected, e) {
        let selected = new Selected();
        selected.rows = [row];
        selected.selected = isSelected;
        this.props.onRowSelect(selected);
    }
    onSelectAll(isSelected, rows) {
        let selected = new Selected();
        selected.rows = rows;
        selected.selected = isSelected;
        this.props.onRowSelect(selected);
    }
    render() {
        let data = this.props.data;
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
                text: 'All', value: data.length
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
            mode: 'radio',
            clickToSelect: true,
            unselectable: [ 1 ],
            bgColor: '#fff2fc',
            onSelect: this.onRowSelect.bind(this),
            onSelectAll: this.onSelectAll.bind(this)
        };
        if(data!=undefined) {
            return (
                <BootstrapTable ref='hashtrackTable' data={ data } pagination selectRow={ selectRowProp } striped={ true } search={ true }>
                    <TableHeaderColumn dataField='_id' isKey dataSort={ true } hidden={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='task_id' dataSort={ true }>Task ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='timestamp' dataSort={ true }>Timestamp</TableHeaderColumn>
                    <TableHeaderColumn dataField='sha256' dataSort={ true }>Hash</TableHeaderColumn>
                    <TableHeaderColumn dataField='mime_type' dataSort={ true }>Mime</TableHeaderColumn>
                    <TableHeaderColumn dataField='site' dataSort={ true }>Site</TableHeaderColumn>
                    <TableHeaderColumn dataField='comment' dataSort={ true }>Comment</TableHeaderColumn>
                    <TableHeaderColumn dataField='reason' dataSort={ true }>Reason</TableHeaderColumn>
                    <TableHeaderColumn dataField='mitigation' dataSort={ true }>Mitigation</TableHeaderColumn>
                </BootstrapTable>
            );
        }else{
            return (
                <div>Empty.</div>
            )
        }
    }
}

export class Selected{
    get rows() {
        return this._rows;
    }

    set rows(value) {
        this._rows = value;
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        this._selected = value;
    }
    constructor(){
        this._rows = new Array();
        this._selected = new Boolean();
    }

}