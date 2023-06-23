import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './FormComponent.module.scss';

interface FormComponentProps {
	label: string;
	name: string;
	register: any;
	errors?: any;
	isRequired?: boolean;
	options?: string[];
}

export const FormComponent: React.FC<FormComponentProps> = ({
	label,
	name,
	register,
	errors,
	isRequired,
	options,
}) => {
	return (
		<div>
			<label className={styles.label} htmlFor={name}>
				{errors[name] && (
					<span className={styles.error}>This field is required</span>
				)}
				{!errors[name] && <span>{label}</span>}
			</label>
			{options ? (
				<select {...register(name)} className={styles.input}>
					{Array.isArray(options) &&
						options.length > 0 &&
						options.map((option) => (
							<option value={option} key={'123'}>
								{option}
							</option>
						))}
				</select>
			) : (
				<input
					{...register(name, { required: isRequired })}
					id={name}
					name={name}
					type="text"
					className={styles.input}
				/>
			)}
		</div>
	);
};
