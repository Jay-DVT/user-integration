import { useNavigate } from "react-router-dom";
import avatar from "../../../assets/avatar.svg";
const Card = ({ user }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/users/${user.id}`);
	};

	return (
		<div
			className='flex p-3 w-full gap-3 rounded-lg text-center items-center shadow-[0_10px_13px_-1px_rgba(0,0,0,0.1)] bg-primary'
			onClick={handleClick}
		>
			<img src={avatar} alt='user' width={90} className="bg-white rounded-full "/>
			<div className='text-white flex flex-col items-center justify-center w-full'>
				<p>{user.name}</p>
				{user.specialty ? <p>{user.specialty}</p> : <p>General</p>}
				{user.email}
			</div>
		</div>
	);
};

export default Card;
