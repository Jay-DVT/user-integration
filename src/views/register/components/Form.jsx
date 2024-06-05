import { useState } from "react";

const Form = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		const newForm = {
			...form,
			[name]: value,
		};
		setForm(newForm);
	};

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:3000/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});
			return res.status === 200
				? alert("Registro exitoso")
				: alert("Error al registrar");
		} catch (error) {
			alert("Error al registrar");
			throw new Error("Error al registrar");
		}
	};

	return (
		<div>
			<h1>Registro de Usuario</h1>
			<form style={{ display: "flex", flexDirection: "column" }}>
				<p>Nombre</p>
				<input
					style={{
						height: "45px",
						width: "60%",
						paddingLeft: "5px",
						borderRadius: "5px",
						border: "1px solid #399C7E",
					}}
					type='text'
					name='name'
					placeholder='Nombre'
					value={form.name}
					onChange={handleChange}
				/>
				<p>Email</p>
				<input
					style={{
						height: "45px",
						width: "60%",
						paddingLeft: "5px",
						borderRadius: "5px",
						border: "1px solid #399C7E",
					}}
					type='email'
					name='email'
					placeholder='Email'
					value={form.email}
					onChange={handleChange}
				/>
				<label htmlFor='address'>Direccion</label>
				<input
					style={{
						height: "45px",
						width: "60%",
						paddingLeft: "5px",
						borderRadius: "5px",
						border: "1px solid #399C7E",
					}}
					name='address'
          placeholder="Direccion"
					type='text'
				/>
				<label htmlFor='age'>Edad</label>
				<input
					style={{
						height: "45px",
						width: "60%",
						paddingLeft: "5px",
						borderRadius: "5px",
						border: "1px solid #399C7E",
					}}
					name='age'
					type='number'placeholder="Edad"
				/>
				<label htmlFor='specialty'>Specialty</label>
				<input
					style={{
						height: "45px",
						width: "60%",
						paddingLeft: "5px",
						borderRadius: "5px",
						border: "1px solid #399C7E",
					}}
					name='specialty'
					type='text'
          placeholder="Especialidad"
				/>
				<div style={{ paddingTop: "5%" }}>
					<button
						onClick={handleSubmitForm}
						style={{
							height: "50px",
							width: "140px",
							backgroundColor: "#399C7E",
							border: "none",
							color: "white",
							cursor: "pointer",
							fontSize: "15px",
							fontWeight: "bold",
							textAlign: "center",
							borderRadius: "5px",
						}}
						type='submit'
					>
						Registrar
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;
