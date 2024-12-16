import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import ky from 'ky'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  loader: async () => {


    const todos = await ky.get('/api/todos').json<{ data: string[] }>()

    return { todos }
  }
})

function HomeComponent() {
  const { todos: todosData } = Route.useLoaderData()
  const [newTodo, setNewTodo] = React.useState('')
  const [todos, setTodos] = React.useState(todosData.data)


  async function deleteTodo(index: number) {
    const response = await fetch('/api/remove-todo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ index: index })
    });
    if (response.ok) {
      setTodos(todos.filter((todo, i) => i !== index))
    }
  }

  async function addTodo() {
    const response = await fetch('/api/add-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: newTodo })
    });
    if (response.ok) {
      setTodos([...todos, newTodo])
      setNewTodo('')
    } else {
      const res = await response.text()
      window.alert('Failed to add todo - ' + res)
      window.location.reload()
    }
  }

  return (
    <>
      <div className={"mt-10"}>
        <h1 className={"text-2xl font-bold text-center"}>React, Vite, Tailwind and Go Stack</h1>
        <div className={"flex mt-5 justify-center flex-col w-[50%] mx-auto"}>
          {todos && (
            <ul>
              {todos.map((todo, index) => (
                <li key={index} className={"border border-gray-300 p-2 ml-2 mt-2"}>{todo}
                  <span className={"text-red-500 ml-2 float-right font-bold hover:cursor-pointer"} key={"del-" + index} onClick={() => deleteTodo(index)}>X</span>
                </li>
              ))}
            </ul>
          )}
          {todos && (
            <>
              <input type="text" placeholder="Add a todo" className={"border border-gray-300 p-2 ml-2 mt-2 text-black"} value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
              <button className={"bg-blue-500 text-white p-2 ml-2 mt-2"} onClick={addTodo}>Add</button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
