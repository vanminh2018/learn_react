import { useState } from 'react';

function Todos() {
    console.log("render Todos...");
    // Khởi tạo state cho danh sách công việc và giá trị input hiện tại
    const [todos, setTodos] = useState([
        {
            id: Date.now(),
            text: "Demo abc",
            isCompleted: false
        }
    ]);
    const [inputValue, setInputValue] = useState('');

    // Hàm xử lý thêm công việc mới
    const handleAddTodo = () => {
        console.log("fn handleAddTodo...", inputValue);
        if (inputValue.trim()) {
            setTodos([
                ...todos,
                {
                    id: Date.now(),
                    text: inputValue,
                    isCompleted: false
                }
            ]);
            setInputValue('');
        }
    };

    // Hàm xử lý đánh dấu hoàn thành công việc
    const toggleComplete = id => {
        console.log("fn toggleComplete...", id);
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        );
    };

    // Hàm xử lý xóa công việc
    const handleDeleteTodo = id => {
        console.log("fn handleDeleteTodo...", id);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <>
            <h1>TodoList</h1>
            <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Thêm công việc..."
            />
            <button onClick={handleAddTodo}>Thêm</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                        {todo.text}
                        <button onClick={() => toggleComplete(todo.id)}>
                            {todo.isCompleted ? 'Hoàn tác' : 'Hoàn thành'}
                        </button>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Todos