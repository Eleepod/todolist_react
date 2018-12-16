import React from 'react';
import PropTypes from 'prop-types';

const CalendarBtn = (props) => {

    return (
        <div className="input-group-prepend" id="calendarOpener" onClick={props.onclick}>
            <span className="input-group-text"><i className="fa fa-calendar"/></span>
        </div>
    );

};

export default CalendarBtn;

CalendarBtn.propTypes = {
  onclick: PropTypes.func, // обработчик события
};