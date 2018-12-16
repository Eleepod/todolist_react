import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TaskInput from "../form/task_input";
import Button from "../form/button";
import {rnd} from "../../lib/fn";

export class TaskForm extends Component {
    static propTypes = {
        handleAdd: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            data: {},
            errState: false,
            errHints: this.defaultErrHints(),
        };
    };

    defaultErrHints = () => ({
        'taskNameHintText': 'Введите название задачи',
        'taskNameHintState': false,
        'reminderDateHintText': 'Введите дату и время напоминания',
        'reminderDateHintState': false,
    });

    handleChange = (e) => { //обработчик нажатия клавиши
        const { target } = e; //десруктуризация: попытка найти в e свойство target и присвоения его в переменную target (если не найдено, то null, либо можно через рано в {} указать значение по-умолчанию)
        //const name = e?.target?.name||'default name'// ?. проверяет есть ли свойство, если нет, то null
        const { name } = target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            data: {...this.state.data, [name]: value},// взять объект this.state.data, создать новый объект на его основе и добавить поле [name] со значением value
        });
        /* плохой вариант, т.к. в этом случае будет вызван render для всех вариантов.
        const stateCopy = Object.assign({},this.state); //вариант конирования объекта, со state работать напрямую нельзя, тк не будут выполнятся автоматические обрабработчики reacta
        stateCopy.data[name] = value;
        this.setState(stateCopy);
        */

    };

    generateId = () => {
        let rndNum = rnd(0,1000000);
        return '' + this.state.data.taskName + rndNum;
    };

    handleAdd = () => {
        let errorState = false;
        if (!this.state.data.taskName || !this.state.data.taskName.length) {
            errorState = true;
            this.setState( prevState => {
                prevState.errHints.taskNameHintState = true;
                prevState.errHints.taskNameHintText = 'Нужно ввести задание!';
            })
        }
        if (!this.state.data.reminderDate || !this.state.data.reminderDate.length) {
            errorState = true;
            this.setState( prevState => {
                prevState.errHints.reminderDateHintState = true;
                prevState.errHints.reminderDateHintText = 'Нужно ввести дату!';
            })
        }
        this.setState({errState: errorState});
        if (errorState) {
            return;
        }
        this.setState({errHints: this.defaultErrHints()});
        let newItem = {
            id: this.generateId(),
            title: this.state.data.taskName,
            date: this.state.data.reminderDate,
            urgent: this.state.data.importantCheck,
        };
        this.props.handleAdd(newItem);
    };

    render() {
        return (
            <div className='col-md-6'>
                <form id="form1">
                    <div className="row">
                        <div className="col-md-6">
                            <TaskInput
                                name={ 'taskName' }
                                placeholder={ 'Занятие' }
                                value={ this.state.data.taskName || '' }
                                onChange={ this.handleChange }
                                label={ 'Название задачи' }
                                errorHint={ this.state.errHints.taskNameHintText }
                                errorState={ this.state.errHints.taskNameHintState }
                            />
                            <TaskInput
                                name={ 'reminderDate' }
                                placeholder={ 'Напомнить' }
                                value={ this.state.data.reminderDate || '' }
                                onChange={ this.handleChange }
                                label={ 'Когда напомнить' }
                                errorHint={ this.state.errHints.reminderDateHintText }
                                errorState={ this.state.errHints.reminderDateHintState }
                                readOnly={ false }
                                calendarClick={ () =>{alert('calendar clicked')} }
                            />
                            <TaskInput
                                name={ 'importantCheck' }
                                type={ 'checkbox' }
                                checked={ this.state.data.importantCheck || false }
                                className={ 'form-check-input' }
                                classNameForm={ 'form-group form-check' }
                                onChange={ this.handleChange }
                                label={ 'Важно' }
                            />
                            <Button
                                text={ 'AddTask' }
                                onClick={ this.handleAdd }
                            />
                            <Button
                                text={ 'Clear' }
                                className={ 'btn btn-light' }
                                onClick={ () => this.setState({data: {}}) }
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}