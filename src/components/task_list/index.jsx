import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from "../form/button";
import ListItem from "./list_item";

export default class TaskList extends Component {
    static propTypes = {
        name: PropTypes.string,
        dataList: PropTypes.array,
        handleDelete: PropTypes.func,
        handleClear: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = { //значения пропсов по-умолчанию
        className: 'list-group'
    };

    handleDelete = (id) => {
        this.props.handleDelete(id);
    };

    renderItem = (item) => {
        return (
            <ListItem
                key={ item.id }
                id={ item.id }
                title={ item.title }
                date={ item.date }
                urgent={ item.urgent }
                onclick={ this.handleDelete }
            />);
    };

    render() {
        const list = this.props.dataList.map(this.renderItem);
        const emptyItem = this.renderItem({ title: 'список пуст' });
        return (
            <div className='col-md-6'>
                <div className="card" style={{width: '100%'}}>
                    <div className="card-body">
                        <h5 className="card-title">Список дел</h5>
                        <ul className='list-group'>
                            { list.length === 0 ? emptyItem : list }
                        </ul>

                        <br/>
                        <Button
                            text={ 'Clear' }
                            onClick={ () => this.props.handleClear() }
                        />
                    </div>
                </div>
            </div>
        );
    };
}

