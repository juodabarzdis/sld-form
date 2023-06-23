import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useController } from 'react-hook-form';
import styles from './FormComponent.module.scss';

interface FormComponentProps {
	label: string;
	name: string;
	register: any;
	errors?: any;
	isRequired?: boolean;
	options?: string[];
	rules?: any;
}

export const FormComponent: React.FC<FormComponentProps> = ({
	label,
	name,
	options,
	rules,
}) => {
	const {
		field,
		fieldState: { invalid, isTouched, isDirty, error },
		formState: { touchedFields, dirtyFields },
	} = useController({
		name,
		rules,
	});

	console.log(field);

	return (
		<div>
			<label className={styles.label} htmlFor={name}>
				{error && <span className={styles.error}>This field is required</span>}
				{!error && <span>{label}</span>}
			</label>
			{options ? (
				<select {...field} className={styles.input}>
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
					{...field}
					id={name}
					name={name}
					type="text"
					className={styles.input}
				/>
			)}
		</div>
	);
};
