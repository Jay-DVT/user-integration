const fetchDescriptionByUser = async (userId) => {
	const response = await fetch(
		`http://localhost:3000/descriptions/user/${userId}`
	);
	return await response.json();
};

const postDescription = async (userId, data) => {
	const response = await fetch(`http://localhost:3000/descriptions/${userId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return await response.json();
};

export { fetchDescriptionByUser, postDescription };
