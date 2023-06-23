import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { FormComponent } from '../FormComponent/FormComponent';
import styles from './Form.module.scss';

type Inputs = {
	firstName: string;
	lastName: string;
	country: string;
};

export const Form = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<Inputs>();

	const [apiData, setApiData] = useState([]);
	const [countryNames, setCountryNames] = useState([]);
	const [submittedData, setSubmittedData] = useState([]);

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, submittedData, reset]);

	const api = axios.create({
		baseURL: 'https://restcountries.com/v3.1',
	});

	api.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			if (error.response) {
				if (error.response.status === 404) {
					console.log('404 Error: Resource not found');
				} else if (error.response.status === 500) {
					console.log('500 Error: Internal server error');
				} else if (error.response.status === 403) {
					console.log('403 Error: Forbidden');
				}
			} else if (error.request) {
				console.log('Request Error:', error.request);
			} else {
				console.log('Error:', error.message);
			}
			return Promise.reject(error);
		}
	);

	useEffect(() => {
		api
			.get('/region/europe')
			.then(function (response) {
				setApiData(response.data);
				const names = response.data.map((country: any) => country.name.common);
				setCountryNames(names);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		setSubmittedData([...submittedData, data]);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				name="myForm"
				className={styles.form}
			>
				<FormComponent
					label="First Name"
					name="firstName"
					register={register}
					errors={errors}
					isRequired={true}
				/>
				<FormComponent
					label="Last Name"
					name="lastName"
					register={register}
					errors={errors}
					isRequired={true}
				/>
				<FormComponent
					label="Country"
					name="country"
					register={register}
					errors={errors}
					options={countryNames}
					isRequired={true}
				/>
				<input type="submit" className={styles.submitButton} />
			</form>
			<div>
				<ul>
					{submittedData &&
						submittedData.map((item) => (
							<li key={'123'}>
								{item.firstName} {item.lastName} {item.country}
							</li>
						))}
				</ul>
			</div>
		</>
	);
};
