import { useEffect, useState } from "react";
import Card from "./components/Card";
import { fetchUsers } from "../../utils/users";

const Dashboard = () => {
	const [users, setUsers] = useState([]);

	const getUsers = async () => {
    const data = await fetchUsers();
		setUsers(data);
	};

	useEffect(() => {
    getUsers();
	}, []);

	return (
		<section className='flex justify-center h-screen overflow-auto'>
			<div className='w-fit flex flex-col gap-5 m-5'>
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
