import { useEffect, useState } from "react";
import Card from "./components/Card";
import NavigationBar from "../../shared/NavigationBar";
import { fetchUsers } from "../../utils/users";

const Dashboard = () => {
	const [users, setUsers] = useState([]);
	const [query, setQuery] = useState("");

	const getUsers = async () => {
		const data = await fetchUsers();
		setUsers(data);
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<NavigationBar location="dashboard" onSearch={setQuery}>
			<section className='flex justify-center h-full overflow-auto'>
				<div className='w-fit flex flex-col gap-5 m-5'>
					{users.length === 0 ? (
						<div>Loading...</div>
					) : (
					users.filter((user) => user.name.toLowerCase().includes(query)).map((user) => (
						<div key={user.id}>
							<Card user={user} />
						</div>
					)))}
				</div>
			</section>
		</NavigationBar>
	);
};

export default Dashboard;
