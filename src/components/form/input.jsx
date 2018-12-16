import React, {Component} from 'react';
import PropTypes from 'prop-types';
export default class TextInput extends  Component {
    static propTypes = {
        value: PropTypes.string, //значение инпута по-умолчанию
        checked: PropTypes.bool, // признак для checkbox
        name: PropTypes.string, //имя компонента
        type: PropTypes.string, //тип
        placeholder: PropTypes.string, //подсказка
        areaDescriedBy: PropTypes.string, //подсказка внизу инпута
        className: PropTypes.string, //классы для стилизации компонента
        onChange: PropTypes.func, //функция обработчик события изменения содержимого инпута
        readOnly: PropTypes.bool, //элемент не доступен для редактирования
    };

    static defaultProps = { //значения пропсов по-умолчанию
        type: 'text',
        className: 'form-control',
        readOnly: false,
    };

    constructor (props, context) {
        super(props,context);
    };

    render() {
        return (
            <input
                type={ this.props.type }
                className={ this.props.className}
                id={ this.props.name }
                name={ this.props.name }
                value={ this.props.value }
                checked={ this.props.checked }
                aria-describedby={ this.props.areaDescriedBy }
                placeholder={ this.props.placeholder }
                onChange={ this.props.onChange }
                readOnly={ this.props.readOnly }
            />
        );
    }
}