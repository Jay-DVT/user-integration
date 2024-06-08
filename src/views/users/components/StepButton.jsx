export default function StepButton({disabled, handleClick, text, color}) {
	return (
		<button
			disabled={disabled}
			onClick={handleClick}
			className={`bg-primary text-white m-2 w-fit rounded-md p-2 disabled:${color ? `bg-${color}` : `bg-primary`}/20 ${color ? `bg-${color}` : `bg-primary`} disabled:cursor-not-allowed disabled:text-gray-400   `} 
		>
			{text}
		</button>
	);
}
