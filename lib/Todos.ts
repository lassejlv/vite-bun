const FileName = "todos.json"


export const checkTodos = async (): Promise<{ error: boolean, data?: any }> => {
  try {
    let todos: string[] = []

    const fileExist = await Bun.file(FileName).exists()

    if (!fileExist) {
      await Bun.write(FileName, JSON.stringify([]))
      todos = []
      console.log('Todos file created')
    } else {
      const data = await Bun.file(FileName).json()
      todos = JSON.parse(data)
    }

    return { error: false, data: todos }
  } catch (error) {
    return { error: true }
  }
}


export const AddTodo = async (task: string): Promise<{ error: boolean, data?: any }> => {
  try {
    const { error, data } = await checkTodos()

    if (error) {
      return { error: true }
    }

    const todos = data

    todos.push(task)

    await Bun.write(FileName, JSON.stringify(todos))

    return { error: false }
  } catch (error) {
    return { error: true }
  }
}

export const RemoveTodo = async (task: string): Promise<{ error: boolean, data?: any }> => {
  try {
    const { error, data } = await checkTodos()

    if (error) {
      return { error: true }
    }

    const todos = data

    const newTodos = todos.filter((t: string) => t !== task)

    await Bun.write(FileName, JSON.stringify(newTodos))

    return { error: false }
  } catch (error) {
    return { error: true }
  }
}
