import React from 'react';
import PropTypes from 'prop-types';
import './list_item.css';

export const ListItem = (props) => {
    const {
        id,
        title,
        date,
        urgent,
        onclick,
    } = props;
    const simpleItem = (!date && !urgent);
    const urgentTag = urgent && (
        <React.Fragment>
            <i className="text-danger fa fa-exclamation-triangle"/>&nbsp;
        </React.Fragment>);
    const dateTag = date && (
        <React.Fragment>
            <br/>
            <span className="text-muted">
                <small>{ date }</small>
            </span>
        </React.Fragment>);
    return simpleItem ? (
        <li className='list-group-item'>
            { title }
        </li>) : (
        <li className='list-group-item'>
            { urgentTag }
            { title }
            { dateTag }
            <span className="delete-ico" onClick={ () => { onclick(id) }}>
                <i className="fas fa-times-circle"/>
            </span>
        </li>);
};

export default React.memo(ListItem);

ListItem.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    urgent: PropTypes.bool,
    onclick: PropTypes.func,
};