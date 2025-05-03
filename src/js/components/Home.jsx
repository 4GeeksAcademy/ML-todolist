import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Todolist from "../components/ToDoList";

//create your first component
function Home() {
	return (
		<div className="text-center mt-5">
			<h1>To Do List</h1>
			<div className="card">
				<Todolist />
			</div>
		</div>
	);
}

export default Home;