import Form from "./components/Form";
import form from "../../assets/form.svg";
import NavigationBar from "../../shared/NavigationBar";
const Register = () => {
	return (
		<NavigationBar>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
					alignItems: "center",
				}}
			>
				<div
					style={{
						height: "100vh",
						width: "100vw",
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
						alignItems: "center",
					}}
				>
					<img src={form} alt='formImage' width={700} />
				</div>
				<div style={{ width: "50%" }}>
					<Form />
				</div>
			</div>
		</NavigationBar>
	);
};

export default Register;
