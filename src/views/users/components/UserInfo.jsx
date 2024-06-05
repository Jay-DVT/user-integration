
import avatar from "../../../assets/avatar.svg";

export default function UserInfo({ user }) {
	return (
		<div className='flex flex-col h-[300px] w-[250px] rounded-md text-center items-center justify-center shadow-[0_10px_13px_-1px_rgba(0,0,0,0.1)]'>
			<img src={avatar} alt='user' width={90} />
			<div className=''>
				<p>{user.name}</p>
				<p>{user.email}</p>
				<p>{user.address}</p>
				<p>{user.specialty}</p>
			</div>
		</div>
	);
}
