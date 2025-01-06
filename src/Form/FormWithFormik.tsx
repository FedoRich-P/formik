import {useState, FocusEvent} from 'react';
import {ErrorMessage, Field, Form, Formik, FormikProps, useField} from 'formik';
import * as Yup from 'yup';
import s from './Form.module.scss';
import {validateEmail} from '../validation/validation.ts';


// const MyTextInput = ({label, ...props}) => {
//     const [field, meta] = useField(props);
//     return (
//         <label>
//             {label}
//             <input {...props} {...field}/>
//             {meta.touched && meta.error && (<div className={s.error}>{meta.error}</div>)}
//         </label>
//     )
// }

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Минимум 2 символа')
        .max(50, 'Очень длинное имя!')
        .required('Поле обязательно для заполнения'),
    email: Yup.string()
        .test('email', function (value) {
            if (!value) return this.createError({message: 'Поле обязательно для заполнения'});
            const errorMessage = validateEmail(value);
            if (errorMessage) {
                return this.createError({message: errorMessage});
            }
            return true;
        })
        .required('Поле обязательно для заполнения'),
    amount: Yup.number()
        .min(10, 'Сумма должна быть не менее 10')
        .required('Поле обязательно для заполнения'),
    currency: Yup.string().required('Выберите валюту'),
    text: Yup.string().min(10, 'Не менее 10 символов'),
    terms: Yup.boolean()
        .oneOf([true], 'Необходимо согласие')
        .required('Необходимо согласие'),
});

export const FormWithFormik = () => {
    const [isSubmitting, setIsSubmitting] = useState(false); // Локальное состояние для отслеживания отправки

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, {resetForm, setSubmitting}) => {
                try {
                    setIsSubmitting(true);
                    console.log(JSON.stringify(values, null, 2));
                    resetForm();
                } catch (error) {
                    console.error('Ошибка при отправке формы:', error);
                    alert('Что-то пошло не так. Попробуйте снова!');
                } finally {
                    setIsSubmitting(false);
                    setSubmitting(false);
                }
            }}
            validateOnBlur={true}
            validateOnChange={true}
            validateOnMount={true}
        >
            {({errors, touched, values, dirty}) => {
                const isFormValid = Object.keys(errors).length === 0 && values.terms;

                return (
                    <Form className={s.form}>
                        <h2>Отправить перевод</h2>
                        <label htmlFor="name">
                            Ваше имя:
                            <Field id="name"
                                   name="name"
                                   type="text"
                                   className={`${s.input} ${touched.name && errors.name ? s.errorInput : ''}`}
                            />
                            <ErrorMessage name={'name'} className={s.error} component={'div'}/>
                            {/*{touched.name && errors.name && (*/}
                            {/*    <div className={s.error}>{errors.name}</div>*/}
                            {/*)}*/}
                        </label>

                        <label htmlFor="email">
                            Ваша электронная почта:
                            <Field id="email"
                                   name="email"
                                   type="email"
                                   className={`${s.input} ${touched.email && errors.email ? s.errorInput : ''}`}
                            />
                            <ErrorMessage name={'email'} className={s.error} component={'div'}/>
                        </label>

                        <label htmlFor="amount">
                            Сумма перевода:
                            <Field id="amount"
                                   name="amount"
                                   type="number"
                                   className={`${s.input} ${touched.amount && errors.amount ? s.errorInput : ''}`}
                                   onFocus={(e: FocusEvent<HTMLInputElement>) => {
                                       if (e.target.value === '0') {
                                           e.target.value = '';
                                       }
                                   }}
                            />
                            <ErrorMessage name={'amount'} className={s.error} component={'div'}/>
                        </label>

                        <label htmlFor="currency">
                            Валюта:
                            <Field id="currency"
                                   name="currency"
                                   className={`${s.input} ${touched.currency && errors.currency ? s.errorInput : ''}`}
                                   as="select"
                            >
                                <option value="">Выберите валюту</option>
                                <option value="USD">USD - доллары</option>
                                <option value="EUR">EUR - евро</option>
                                <option value="TG">TG - тугрики</option>
                            </Field>
                            <ErrorMessage name={'currency'} className={s.error} component={'div'}/>
                        </label>

                        <label htmlFor="text">
                            Ваше сообщение:
                            <Field id="text"
                                   name="text"
                                   className={`${s.textarea} ${touched.text && errors.text ? s.errorInput : ''}`}
                            />
                            <ErrorMessage name={'text'} className={s.error} component={'div'}/>
                        </label>

                        <label className={s.checkbox}>
                            <Field name="terms" type="checkbox"/>
                            Соглашаетесь с политикой конфиденциальности?
                        </label>
                        <ErrorMessage name={'terms'} className={s.error} component={'div'}/>
                        <button type="submit"
                                disabled={isSubmitting || !isFormValid || !dirty}
                                className={s.button}
                        >
                            {isSubmitting ? 'Отправка...' : 'Отправить перевод'}
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};