import { useState } from "react";

export default function HelpRAG() {
	const [disabled, setDisabled] = useState(true);
	const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPrompt(value);
		if (value.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	};

	const handleGenerateHelp = async () => {
		setDisabled(true);
        const message = {
            prompt: prompt,
        }
		const response = await fetch("http://localhost:3000/chat/rag/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});
		const data = await response.json();
		if (!data.response) {
			setDisabled(false);
			return;
		}
        console.log(data.response);
        setResponse(data.response);
		setDisabled(false);
	};
	return (
		<div className='flex flex-col w-full h-full bg-primary p-12 gap-3 rounded-lg'>
			<div className='text-lg'>
				Genera una pregunta con el apoyo de nuestros archivos
			</div>
			<textarea
				className='w-full rounded-md p-4'
				name='prompt'
				value={prompt}
				id='prompt'
				onChange={handleChange}
			></textarea>
			<button
				className='bg-white text-primary rounded-md p-2 w-1/2 self-center disabled:opacity-50'
				disabled={disabled}
				onClick={handleGenerateHelp}
			>
				Enviar
			</button>

			<div>{response && <div>"{response}"</div>}</div>
		</div>
	);
}
