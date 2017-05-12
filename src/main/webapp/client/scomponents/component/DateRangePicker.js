import React from 'react';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
    Button,
} from 'react-bootstrap';

class DateRangePicker extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        let start = this.props.startDate.format('YYYY-MM-DD');
        let end = this.props.endDate.format('YYYY-MM-DD');
        let label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }
        // let label = "asc";

        return (
                <DatetimeRangePicker
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    onApply={this.props.clickHandler}
                    maxDate={this.props.maxDate}
                >
                    <div className="input-group">
                        <input type="text" className="form-control" value={label}/>
                        <span className="input-group-btn">
                            <Button className="default date-range-toggle calspeck">
                              <i className="glyphicon glyphicon-calendar"/>
                            </Button>
                        </span>
                    </div>
                </DatetimeRangePicker>

        );
    }

}
DateRangePicker.propTypes = {
    clickHandler: PropTypes.func
}

export default DateRangePicker;