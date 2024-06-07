import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const NavigationBar = ({ children, location, onSearch }) => {
	return (
		<div className='h-screen flex flex-col'>
			<div className='flex items-center gap-3 h-16 w-full shadow-sm px-4 bg-primary'>
				<div
					className='flex items-center gap-1 hover:cursor-pointer hover:bg-white hover:text-primary p-1 px-2 rounded-md text-white'
					onClick={() => {
						// go to '/'
						window.location.href = "/";
					}}
				>
					<IoHomeOutline />
					dashboard
				</div>
				<div
					className='hover:cursor-pointer hover:bg-white hover:text-primary p-1 px-2 rounded-md gap-1 flex items-center text-white'
					onClick={() => {
						window.location.href = "/register";
					}}
				>
					<FaUserPlus />
					Registro
				</div>
				{location === "dashboard" && (
					<div className='border-slate-500/20 border-2 rounded-xl flex items-center p-[1px] bg-white'>
						<div className='flex items-center p-2'>
							<FaSearch />
						</div>
						<input
							type='text'
							name='search'
							id='search'
							className="focus:outline-none"
							onChange={(e) => onSearch(e.target.value.toLowerCase())}
						/>
					</div>
				)}
			</div>
			{children}
		</div>
	);
};

export default NavigationBar;
