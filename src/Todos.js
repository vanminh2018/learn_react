import { useState } from 'react'

function Todos() {
  console.log('render Todos...')
  const [todos, setTodos] = useState([
    {
      id: Date.now(),
      text: 'Demo abc',
      isCompleted: false
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState(null) // State mới để theo dõi id của công việc đang được sửa
  const [editingText, setEditingText] = useState('') // State để theo dõi nội dung đang sửa

  const handleAddTodo = () => {
    console.log('fn handleAddTodo...', inputValue)
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          isCompleted: false
        }
      ])
      setInputValue('')
    }
  }

  const toggleComplete = id => {
    console.log('fn toggleComplete...', id)
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
  }

  const handleDeleteTodo = id => {
    console.log('fn handleDeleteTodo...', id)
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Hàm xử lý bắt đầu sửa công việc
  const handleEditTodo = (todo) => {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  // Hàm xử lý cập nhật công việc sau khi sửa
  const handleUpdateTodo = (id, newText) => {
    if (newText.trim()) {
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)))
      setEditingId(null)
      setEditingText('')
    }
  }

  return (
    <>
      <h1>TodoList</h1>
      <input
        type='text'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder='Thêm công việc...'
      />
      <button onClick={handleAddTodo}>Thêm</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
            {editingId === todo.id ? (
              <input
                type='text'
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              todo.text
            )}
            {/* Chỉ hiển thị các nút này khi không có todo nào đang được chỉnh sửa */}
            {editingId !== todo.id && (
              <>
                <button onClick={() => toggleComplete(todo.id)}>
                  {todo.isCompleted ? 'Hoàn tác' : 'Hoàn thành'}
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}>Xóa</button>
              </>
            )}
            {/* Nút để chuyển sang chế độ chỉnh sửa hoặc cập nhật todo */}
            {editingId === todo.id ? (
              <button onClick={() => handleUpdateTodo(todo.id, editingText)}>Cập nhật</button>
            ) : (
              <button onClick={() => handleEditTodo(todo)}>Sửa</button>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos