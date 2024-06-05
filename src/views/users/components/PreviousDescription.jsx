import React from "react";

const PreviousDescription = ({ description }) => {
	return <div className="bg-slate-300 rounded-md w-fit p-2">{description.description} | {description.prescription && description.prescription}</div>;
};

export default PreviousDescription;
