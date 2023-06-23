import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();
	const formMethods = useForm<Inputs>();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = formMethods;

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
		(response) => {
			return response;
		},
		(error) => {
			if (error.response) {
				if (error.response.status === 404) {
					console.log('404 Error: Resource not found');
					navigate('/error');
				} else if (error.response.status === 500) {
					console.log('500 Error: Internal server error');
					navigate('/error');
				} else if (error.response.status === 403) {
					console.log('403 Error: Forbidden');
					navigate('/error');
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
		<div className={styles.sectionWrapper}>
			<FormProvider {...formMethods}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					name="myForm"
					className={styles.form}
				>
					<FormComponent
						label="First Name"
						name="firstName"
						rules={{ required: true }}
					/>
					<FormComponent
						label="Last Name"
						name="lastName"
						rules={{ required: true }}
					/>
					<FormComponent
						label="Country"
						name="country"
						rules={{ required: true }}
						options={countryNames}
					/>
					<input type="submit" className={styles.submitButton} />
				</form>
			</FormProvider>
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
		</div>
	);
};
