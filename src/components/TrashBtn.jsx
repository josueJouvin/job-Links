const TrashBtn = ({ onClick }) => {
	return (
		<button
			className="active:scale-125"
			onClick={e => {
				e.preventDefault();
				onClick();
			}}
		>
			<svg
				className='cursor-pointer transition duration-300 ease-in-out transform md:hover:scale-125 z-40 md:w-7 md:h-7'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M9.293 3.293A1 1 0 0 1 10 3h4a1 1 0 0 1 1 1v1H9V4a1 1 0 0 1 .293-.707ZM7 5V4a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1h4a1 1 0 1 1 0 2h-1v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7H3a1 1 0 0 1 0-2h4ZM6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7H6Zm4 3a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm5 7v-6a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0Z'
					fill='#d10f0f'
				/>
			</svg>

		</button>
	);
};

export default TrashBtn;