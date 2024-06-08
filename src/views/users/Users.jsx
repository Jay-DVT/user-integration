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
import StepButton from "./components/StepButton";

export default function Users() {
	const [disabled, setDisabled] = useState(true);
	const [helpDisabled, setHelpDisabled] = useState(false);
	const [user, setUser] = useState(null);
	const [descriptions, setDescriptions] = useState([]);
	const [prescription, setPrescription] = useState("");
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

	const handleReset = () => {
		setForm({
			description: form.description,
			prescription: "",
		});
		setDisabled(true);
		setHelpDisabled(false);
		setPrescription("");
	};

	const handleClick = async () => {
		setDisabled(true);
		if (!form.description || !form.prescription) {
			setDisabled(false);

			console.log("No description or prescription");
			return;
		}
		try {
			const response = await postDescription(user.id, form);
		} catch (error) {
			console.log(error);
		}
		getUserDescription(user.id);
		setDisabled(false);
		handleReset();
	};

	async function getUserDescription(id) {
		const data = await fetchDescriptionByUser(id);
		setDescriptions(data);
	}

	const handleGenerateHelp = async () => {
		setHelpDisabled(true);
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
		if (!data.text) {
			setHelpDisabled(false);
			return;
		}
		setForm({
			description: form.description,
			prescription: data.text,
		});
		setPrescription(data.text);
		setDisabled(false);
	};

	useEffect(() => {
		getUser(id);
		getUserDescription(id);
	}, []);
	return (
		<NavigationBar>
			{user ? (
				<section className='flex items-center gap-5 flex-1 h-full'>
					<div className='flex flex-col justify-evenly items-center m-7 h-full py-10 flex-0 w-1/3'>
						<UserInfo user={user} />
						<div className='flex flex-col w-full flex-1 m-2'>
							<label htmlFor='description' className='text-lg'>
								Pregunta tus dudas:
							</label>
							<textarea
								className='bg-gray-200 flex-1 border-2 border-secondary rounded-md p-2 bg-secondary/10 focus:outline-none'
								value={form.description}
								name='description'
								onChange={handleTextChange}
							></textarea>
							<label htmlFor='prescription' className='text-lg'>
								Prescripción
							</label>
							<div className='bg-gray-200 flex-1 border-2 border-primary rounded-md p-2 bg-primary/10 break-words'>
								{prescription}
							</div>
							<div className='flex justify-between'>
								<div className='flex'>
									<StepButton
										disabled={helpDisabled}
										handleClick={handleGenerateHelp}
										text='Preguntar'
									/>
									<StepButton
										disabled={disabled}
										handleClick={handleReset}
										text='Borrar'
										color='red-500'
									/>
								</div>
								<StepButton
									disabled={!prescription}
									handleClick={handleClick}
									text='Guardar'
								/>
							</div>
						</div>
					</div>
					<div className='flex flex-col h-full w-2/3 p-5'>
						<div>
							<div className='text-2xl m-4'>Description</div>
							<div className='flex overflow-x-auto max-w-full w-full gap-5'>
								{descriptions.map((desc, idx) => (
									<div key={idx} className=''>
										<PreviousDescription description={desc} />
									</div>
								))}
							</div>
						</div>
						<div>
							<div className='text-2xl m-4'>Busca en nuestros archivos</div>
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
