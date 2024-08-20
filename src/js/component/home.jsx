import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {

	const [tarea, setTarea] = useState("");
	const [todos, setTodos] = useState([]);

	
	const handleClick = () => {
        addTodo()
		setTarea("")
	}

	const handleChange = (event) => {
       setTarea(event.target.value);
	}

    const deleteTareas = (indice) => {
        const listaNueva = todos.filter((todo, i) => i !== indice)
	    setTodos(listaNueva);
	}
useEffect(() => {

getTodos()
},[])
const getTodos=() => {
	fetch("https://playground.4geeks.com/todo/users/MaxiRomero")
	.then(response=>response.json())
	.then(data=>setTodos(data.todos))
	.catch(error=>console.log(error))
}
const deleteTodo=(id)=>{
	fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
		method: "DELETE",
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		 
		  return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
	  })
	  .then(data => {
		  // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		  getTodos(); // Esto imprimirá en la consola el objeto exacto recibido del servidor
	  })
	  .catch(error => {
		  // Manejo de errores
		  console.log(error);
	  });
}
const addTodo =()=> {
	fetch('https://playground.4geeks.com/todo/todos/MaxiRomero', {
		method: "POST",
		body: JSON.stringify({
			"label": tarea
		}),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		  return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
	  })
	  .then(data => {
		  // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		  getTodos(); // Esto imprimirá en la consola el objeto exacto recibido del servidor
	  })
	  .catch(error => {
		  // Manejo de errores
		  console.log(error);
	  });
}

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">My TodoList With React & Fetch</h1>
			<div className="container">
				<input type="text" onChange={handleChange}></input>
				<button onClick={handleClick}>Add Task</button>
			</div>
			<div>
				<ul>
					{todos.map((todo, indice) => {
						return(
							<li>
                                {todo.label} / {todo.id}
								<button onClick={() => deleteTodo(todo.id)}>Delete</button>
							</li>
						)
					})}
				</ul>
			</div>
			
		</div>
	);
};

export default Home;
