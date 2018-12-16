import React, {Component} from 'react';
import PropTypes from 'prop-types';
export default class Button extends  Component {
    static propTypes = {
        text: PropTypes.string, //надпись на кнопке
        type: PropTypes.string, //тип
        className: PropTypes.string, //классы для стилизации компонента
        onClick: PropTypes.func, //функция обработчик события click
    };

    static defaultProps = { //значения пропсов по-умолчанию
        type: 'button',
        className: 'btn btn-primary'
    };

    constructor (props, context) {
        super(props,context);
    };

    render() {
        return (
            <button
                type={ this.props.type }
                className={ this.props.className}
                onClick={this.props.onClick}>
                { this.props.text }
            </button>
        );
    }
}