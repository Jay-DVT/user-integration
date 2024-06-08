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

	// Organize users by the initial of their name
	const organizedUsers = users.reduce((acc, user) => {
		const initial = user.name[0].toUpperCase();
		if (!acc[initial]) {
			acc[initial] = [];
		}
		if (user.name.toLowerCase().includes(query.toLowerCase())) {
			acc[initial].push(user);
		}
		return acc;
	}, {});

	const sortedInitials = Object.keys(organizedUsers).sort();

	return (
		<NavigationBar location='dashboard' onSearch={setQuery}>
			<section className='flex justify-center h-full overflow-auto'>
				<div className='w-full gap-5 m-5 grid lg:grid-cols-4 grid-cols-2 h-fit'>
					{Object.keys(organizedUsers).length === 0 ? (
						<div>Loading...</div>
					) : query !== "" ? (
						users
							.filter((user) => user.name.toLowerCase().includes(query))
							.map((user) => (
								<div key={user.id} className="h-fit">
									<Card user={user} />
								</div>
							))
					) : (
						sortedInitials.map((initial) => (
							<div key={initial} className=''>
								<h2 className='ml-3 text-3xl font-bold'>{initial}</h2>
								<div className=''>
									{organizedUsers[initial].map((user, index) => (
										<div className='m-2' key={index}>
											<Card key={user.id} user={user} />
										</div>
									))}
								</div>
							</div>
						))
					)}
				</div>
			</section>
		</NavigationBar>
	);
};

export default Dashboard;
