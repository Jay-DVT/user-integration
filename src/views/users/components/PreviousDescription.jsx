import React from "react";

const PreviousDescription = ({ description }) => {
	return (
		<div className='bg-secondary p-2 text-white w-[350px] rounded-lg'>
			<div>{description.description}</div>
			<div className="mt-3">
				<div>Ayuda recibida: </div>
				<div className='bg-white rounded-lg m-2'>
					<div className='bg-secondary/70 p-3'>{description.prescription}</div>
				</div>
			</div>
		</div>
	);
};

export default PreviousDescription;
