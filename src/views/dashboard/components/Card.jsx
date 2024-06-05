import { useNavigate } from "react-router-dom";
import avatar from "../../../assets/avatar.svg";
const Card = ({ user }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/users/${user.id}`);
	};

	return (
		<div
			className='flex l h-[90px] w-full gap-3 px-4 rounded-md text-center items-center justify-around shadow-[0_10px_13px_-1px_rgba(0,0,0,0.1)] '
			onClick={handleClick}
		>
			<img src={avatar} alt='user' width={60} />
			<div className=''>
				<p>{user.name}</p>
			</div>
		</div>
	);
};

export default Card;
