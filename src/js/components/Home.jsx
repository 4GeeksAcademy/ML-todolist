import React, { useEffect, useState } from "react";

const Home = () => {
	const [lista, setLista] = useState([])
	const [tarea, setTarea] = useState("")

	const mostrarTarea = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/rafa")
			console.log(response)
			if (response.status == 404) {
				crearUsuario()
				return
			}
			const data = await response.json()
			console.log(data.todos)
			setLista(data.todos)
		} catch (error) {
			console.log(error)
		}
	}
	const crearUsuario = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/rafa",{
				method:"POST",
				headers:{"Content-Type":"application/json"}
			})
			console.log (response)
		} catch (error) {
			console.log(error)
		}
	}

	const agregarTarea = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/rafa", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ label: tarea, is_done: false })
			});
			if (response.status == 201) {
				mostrarTarea()
				setTarea(""); 
			}
		} catch (error) {
			console.log(error);
		}
	};
	

	const borrarTarea = async (id) => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/"+id, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
			if (response.status == 204) {
				mostrarTarea()
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		mostrarTarea()
	}, [])

	return (
		<div className="text-center container">
			<h2>to do list</h2>
			{/* grega tareas a nuestra lista */}
			<input className="form-control"
				value={tarea}
				onChange={(e) => setTarea(e.target.value)}
				onKeyDownCapture={(e) => e.key === "Enter" ? agregarTarea(e) : null}
			/>

			<ul className="list-group mt-3">
				{lista.map((tarea, index) => ( 
					<li className="list-group-item" key={index}> 
						{tarea.label}
						{/* borrar tareas */}
						<button className="btn btn-outline-danger float-end icono" onClick={() => borrarTarea(tarea.id)}>X</button>
					</li>

				))}


			</ul>

			<p>tareas pendientes: {lista.length}</p>

		</div>
	);
};

export default Home;