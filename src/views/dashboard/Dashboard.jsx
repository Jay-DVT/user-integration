import { useEffect, useState } from "react";
import Card from "./components/Card";

const Dashboard = () => {
	const [users, setUsers] = useState([]);
	const fetchUsers = async () => {
		const response = await fetch("http://localhost:3000/users");
		const data = await response.json();
		setUsers(data);
	};
	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<section className="flex justify-center m-5 ">
			<div className='w-fit flex flex-col gap-3'>
				{users.map((user) => (
					<div key={user.id}>
						<Card user={user} />
					</div>
				))}
			</div>
		</section>
	);
};

export default Dashboard;
