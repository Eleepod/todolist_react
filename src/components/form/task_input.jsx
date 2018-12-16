import React from 'react';
import PropTypes from 'prop-types';
import TextInput from "./input";
import CalendarBtn from './calendar_btn';

//export default class TaskNameInput extends PureComponent { }//STATEFUL /CLASS Component
//export const TaskNameInput = React.memo((props) => {});//STATELESS /FUNCTIONAL Component
export const TaskInput = (props) => {
    const {
        value,
        checked,
        name,
        type,
        placeholder,
        className,
        classNameForm = 'form-group',
        onChange,
        readOnly,
        label,
        errorHint,
        errorState,
        calendarClick,
    } = props;

    const hintName = `${ name }Help`;
    const calendarTag = (typeof calendarClick === 'function') && calendarClick && <CalendarBtn onclick={calendarClick}/>;
    const labelTag = label && (<label htmlFor={ name }>{ label }</label>);
    const thisIsCheckbox = type === 'checkbox';
    const errorHintClass = "form-text " + (errorState ? "text-danger" : "text-muted");

    return (
        <div className={ classNameForm }>
            { !thisIsCheckbox && labelTag }
            <div className="input-group">
                { thisIsCheckbox && labelTag }
                { calendarTag }
                <TextInput
                    name={ name }
                    type={ type }
                    className={ className }
                    areaDescriedBy={ hintName }
                    placeholder={ placeholder }
                    value={ value }
                    checked={ checked }
                    onChange={ onChange }
                    readOnly={ readOnly}
                />
            </div>
            { errorHint && (<small id={ hintName } className={ errorHintClass }>{ errorHint }</small>) }
        </div>
    )
};

export default React.memo(TaskInput);

TaskInput.propTypes = {
    value: PropTypes.string, //значение инпута по-умолчанию
    checked: PropTypes.bool, //признак для checkbox
    name: PropTypes.string, //имя компонента
    type: PropTypes.string, //тип
    placeholder: PropTypes.string, //подсказка
    className: PropTypes.string, //классы для стилизации компонента
    classNameForm: PropTypes.string,//класс для div элемента
    onChange: PropTypes.func, //функция обработчик события изменения содержимого инпута
    readOnly: PropTypes.bool, //элемент не доступен для редактирования
    label: PropTypes.string,//текст для label
    errorHint: PropTypes.string,// строка под инпутом
    errorState: PropTypes.bool,// состояние ошибки
    calendarClick: PropTypes.func,//обработка нажатия на календарь
};