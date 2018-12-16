import React, {Component, Fragment} from 'react';
import TaskList from './components/task_list';
import './App.css';
import {TaskForm} from "./components/task_form"; //получение функции экспортиуемой по-умолчанию и запись ее в TaskNameInput
import PropTypes from 'prop-types';
//import { TaskNameInput } from "./components/form/task_name_input"; //получение экспортируемой функции по имени
//import { TaskNameInput as MyAlias} from "./components/form/task_name_input"; //получение экспортируемой функции по имени и запись ее в свой псевдоним

//TODO перевод данных из формы в стэйт

const testItems = [
    {
        id:23,
        title: 'First item',
        date: '12.12.2018',
    },
    {
        id:26,
        title: 'Second item',
        date: '13.12.2018',
        urgent: true,
    },
    {
        id:29,
        title: 'Third item',
        date: '14.12.2018',
    }
];

class App extends Component {
    static propTypes = {
        handleAdd: PropTypes.func,
    };

    constructor(props, context) {
        super(props,context);

        this.state = {
            list: testItems,
        }
    };

    handleAddItem = (newItem) => {//обработчик добавления нового элемента
        /* обновление стэйта через копирование массива
        const  list = this.state.list.slice();//копирование массива
        list.push(newItem);
        this.setState({ list });//т.к. имя поля list совпадает с переменной list, то можно не указывать имя поля в объекте
        */
        // синтаксис метода setState, позволяющий обновить значение на основе предыдущего состояния
        this.setState(prevState => {
            prevState.list.push(newItem);
            return {list: prevState.list,};
        });
    };

    handleDeleteItem = (id) => {
        this.setState(prevState => ({
            list: prevState.list
                .filter(item => (item.id !== id))})) //возвращает массив, сохраняя только те элементы, для которых выражение равно true
    };

    handleClearList = () => this.setState({list: []});

    handleAddLocal = () => {
      //TODO проверка данных на валидность, вывод ошибки в консоль или handleAdd()
    };

    render() {
        return (
            <Fragment>
                <div className='container' style={{marginTop: '40px'}}>
                    <div className='row'>
                        <h1>React TODO List</h1>
                    </div>
                    <br />
                    <div className='row'>
                        <TaskForm
                            handleAdd={ this.handleAddItem }
                        />
                        <TaskList
                            name={ 'taskList' }
                            dataList={ this.state.list }
                            handleDelete={ this.handleDeleteItem }
                            handleClear={ this.handleClearList }
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default App;