import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchUser } from "../../utils/users";
import {
	fetchDescriptionByUser,
	postDescription,
} from "../../utils/descriptions";
import PreviousDescription from "./components/PreviousDescription";
import UserInfo from "./components/UserInfo";
import NavigationBar from "../../shared/NavigationBar";

export default function Users() {
	const [disabled, setDisabled] = useState(false);
	const [user, setUser] = useState(null);
	const [descriptions, setDescriptions] = useState([]);
	const [form, setForm] = useState({
		description: "",
		prescription: "",
	});
	const { id } = useParams();

	async function getUser(id) {
		const data = await fetchUser(id);
		setUser(data);
	}

	const handleTextChange = (e) => {
		const { name, value } = e.target;
		const newForm = {
			...form,
			[name]: value,
		};
		setForm(newForm);
	};

	const handleClick = async () => {
		setDisabled(true);
		if (!form.description) return;
		try {
			const response = await postDescription(user.id, form);
		} catch (error) {
			console.log(error);
		}
		getUserDescription(user.id);
		setDisabled(false);
	};

	async function getUserDescription(id) {
		const data = await fetchDescriptionByUser(id);
		setDescriptions(data);
		console.log(data);
	}

	const handleGenerateHelp = async () => {
		const prompt = {
			prompt: form.description,
		};
		const response = await fetch("http://localhost:3000/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(prompt),
		});
		const data = await response.json();
		console.log(data);
		return data;
	};

	const DescriptionForm = () => (
		<div className='flex flex-col w-96'>
			Comment on the user :<label htmlFor='description'>Description</label>
			<textarea
				className='bg-gray-200'
				value={form.description}
				name='description'
				onChange={handleTextChange}
			></textarea>
			<label htmlFor='prescription'>Prescription</label>
			<textarea
				className='bg-gray-200'
				value={form.prescription}
				name='prescription'
				onChange={handleTextChange}
			></textarea>
			<button
				disabled={disabled}
				onClick={handleClick}
				className='bg-red-500 m-2 w-fit rounded-md p-2 disabled:bg-red-500/20'
			>
				Enviar
			</button>
		</div>
	);

	useEffect(() => {
		getUser(id);
		getUserDescription(id);
	}, []);

	return (
		<NavigationBar>
			{user ? (
				<section className='flex  items-center gap-5 flex-1 '>
					<div className='flex flex-col justify-evenly items-center m-7 h-full py-10'>
						<UserInfo user={user} />
						<div className='flex flex-col w-full flex-1 m-2'>
							<label htmlFor='description' className='text-lg'>
								Ask for some help:
							</label>
							<textarea
								className='bg-gray-200 flex-1 border-2 border-primary rounded-md p-2 bg-primary/10 focus:outline-none'
								value={form.description}
								name='description'
								onChange={handleTextChange}
							></textarea>
							<label htmlFor='prescription' className='text-lg'>
								Prescription
							</label>
							<textarea
								className='bg-gray-200 flex-1 border-2 border-primary rounded-md p-2 bg-primary/10'
								value={form.prescription}
								name='prescription'
								disabled
								onChange={handleTextChange}
							></textarea>
							<button
								disabled={disabled}
								onClick={handleClick}
								className='bg-primary text-white m-2 w-fit rounded-md p-2 disabled:bg-red-500/20'
							>
								Enviar
							</button>
						</div>
					</div>
					<div className='flex flex-col flex-1 h-full'>
						<div className='text-2xl m-4'>Description</div>
						<div className='flex flex-col gap-2 flex-1'>
							{descriptions.map((desc, idx) => (
								<div key={idx}>
									<PreviousDescription description={desc} />
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				<div className='flex flex-1 items-center justify-center'>
					Loading...
				</div>
			)}
		</NavigationBar>
	);
}
