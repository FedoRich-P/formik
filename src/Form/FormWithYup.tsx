import {  useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import s from './Form.module.scss';
import { validateEmail } from '../validation/validation.ts';

type FormValues = {
    name: string;
    email: string;
    amount: number;
    currency: string;
    text: string;
    terms: boolean;
};

// Схема валидации с использованием Yup
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Минимум 2 символа')
        .max(50, 'Очень длинное имя!')
        .required('Поле обязательно для заполнения'),
    email: Yup.string()
        .test('email', function (value) {
            if (!value) return this.createError({ message: 'Поле обязательно для заполнения' });
            const errorMessage = validateEmail(value);
            if (errorMessage) {
                return this.createError({ message: errorMessage });
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

export const FormWithYup = () => {
    const [isSubmitting, setIsSubmitting] = useState(false); // Локальное состояние для отслеживания отправки

    const formik = useFormik<FormValues>({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false,
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setIsSubmitting(true);
                console.log(JSON.stringify(values, null, 2)); // Логируем данные формы
                resetForm(); // Очищаем форму после успешной отправки
            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
                alert('Что-то пошло не так. Попробуйте снова!');
            } finally {
                setIsSubmitting(false); // Сбрасываем состояние отправки
            }
        },
        validateOnBlur: true,
        validateOnChange: true,
        validateOnMount: true,
    });

    // Логика для дизейблинга кнопки отправки
    const isFormValid = Object.keys(formik.errors).length === 0 && formik.values.terms;

    return (
        <form onSubmit={formik.handleSubmit} className={s.form}>
            <h2>Отправить перевод</h2>

            <label htmlFor="name">
                Ваше имя:
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${s.input} ${formik.touched.name && formik.errors.name ? s.errorInput : ''}`}
                />
                {formik.touched.name && formik.errors.name && <div className={s.error}>{formik.errors.name}</div>}
            </label>

            <label htmlFor="email">
                Ваша электронная почта:
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${s.input} ${formik.touched.email && formik.errors.email ? s.errorInput : ''}`}
                />
                {formik.touched.email && formik.errors.email && <div className={s.error}>{formik.errors.email}</div>}
            </label>

            <label htmlFor="amount">
                Сумма перевода:
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${s.input} ${formik.touched.amount && formik.errors.amount ? s.errorInput : ''}`}
                />
                {formik.touched.amount && formik.errors.amount && <div className={s.error}>{formik.errors.amount}</div>}
            </label>

            <label htmlFor="currency">
                Валюта:
                <select
                    id="currency"
                    name="currency"
                    value={formik.values.currency}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${s.input} ${formik.touched.currency && formik.errors.currency ? s.errorInput : ''}`}
                >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD - доллары</option>
                    <option value="EUR">EUR - евро</option>
                    <option value="TG">TG - тугрики</option>
                </select>
                {formik.touched.currency && formik.errors.currency && <div className={s.error}>{formik.errors.currency}</div>}
            </label>

            <label htmlFor="text">
                Ваше сообщение:
                <textarea
                    id="text"
                    name="text"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${s.input} ${formik.touched.text && formik.errors.text ? s.errorInput : ''}`}
                />
                {formik.touched.text && formik.errors.text && <div className={s.error}>{formik.errors.text}</div>}
            </label>

            <label className={s.checkbox}>
                <input
                    name="terms"
                    type="checkbox"
                    checked={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.touched.terms && formik.errors.terms && <div className={s.error}>{formik.errors.terms}</div>}

            <button
                type="submit"
                disabled={isSubmitting || !isFormValid} // Теперь кнопка блокируется сразу при отправке
                className={s.button}
            >
                {isSubmitting ? 'Отправка...' : 'Отправить перевод'}
            </button>
        </form>
    );
};
