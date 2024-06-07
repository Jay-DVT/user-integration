import avatar from "../../../assets/avatar.svg";

export default function UserInfo({ user }) {
	return (
		<div className='flex p-5 bg-primary rounded-lg text-center items-center text-white justify-center shadow-[0_10px_13px_-1px_rgba(0,0,0,0.1)]'>
			<img
				src={avatar}
				alt='user'
				width={175}
				className='bg-white rounded-full '
			/>
			<div className='pl-4 text-lg'>
				<p>{user.name}</p>
				<p>{user.email}</p>
				<p>{user.address}</p>
				<p>{user.specialty}</p>
			</div>
		</div>
	);
}
