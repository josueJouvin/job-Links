

import {  useState } from "react";

const useEdit = () => {
	
	const [enable, setEnabled] = useState(false);
	const editUser = () => setEnabled(!enable)
	
	const EditBoton = ({onClick}) => (
		<button className="active:scale-125" onClick={(e) =>{
			e.preventDefault()
			onClick()
		}}>
			
			<svg
            className="hover:cursor-pointer transition duration-300 transform md:hover:scale-125 ease-in-out max-w-max z-40 md:w-7 md:h-7"
				width="24"
				height="24"
				viewBox='0 0 24 24'
				fill='#84cc16'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M18.3 3.31a1.828 1.828 0 0 1 1.993 2.983L6.98 19.605l-3.556.97.97-3.556L17.707 3.707c.17-.17.371-.304.593-.396Zm.7-2.138a3.829 3.829 0 0 0-2.707 1.12l-13.5 13.501a1 1 0 0 0-.258.444l-1.5 5.5a1 1 0 0 0 1.228 1.228l5.5-1.5a1 1 0 0 0 .444-.258l13.5-13.5A3.828 3.828 0 0 0 19 1.172Z'
					fill='#65a30d'
				/>
			</svg>
		</button>
	);

	return{
		editUser,
		EditBoton,
		enable
	}
	
};

export default useEdit;

