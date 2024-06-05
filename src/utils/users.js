const fetchUsers = async () => {
	const response = await fetch("http://localhost:3000/users");
	return await response.json();
};

const fetchUser = async (id) => {
	const response = await fetch(`http://localhost:3000/users/${id}`);
	return await response.json();
};

export { fetchUsers, fetchUser };
