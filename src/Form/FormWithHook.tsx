import React, {ChangeEvent, useEffect, useState} from 'react';
import { useFormik } from 'formik';
import s from './Form.module.scss';
import {
    validateAmount,
    validateCurrency,
    validateEmail,
    validateName,
    validateTerms,
    validateText
} from "../validation/validation.ts";

type FormValues = {
    name: string;
    email: string;
    amount: number;
    currency: string;
    text: string;
    terms: boolean;
};

type FormErrors = {
    name?: string;
    email?: string;
    amount?: string;
    currency?: string;
    text?: string;
    terms?: string;
};

const validate = (values: FormValues): Partial<FormErrors> => {
    const errors: Partial<FormErrors> = {};
    const nameError = validateName(values.name);
    if (nameError) errors.name = nameError;
    const emailError = validateEmail(values.email);
    if (emailError) errors.email = emailError;
    const amountError = validateAmount(values.amount);
    if (amountError) errors.amount = amountError;
    const currencyError = validateCurrency(values.currency);
    if (currencyError) errors.currency = currencyError;
    const textError = validateText(values.text);
    if (textError) errors.text = textError;
    const termsError = validateTerms(values.terms);
    if (termsError) errors.terms = termsError;
    return errors;
};

export const FormWithHook = () => {
    const [isFormValid, setIsFormValid] = useState(false);

    const formik = useFormik<FormValues>({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false,
        },
        validate,
        onSubmit: (values, { resetForm }) => {
            console.log(JSON.stringify(values, null, 2)); // Логируем данные формы

// Очищаем форму после успешной отправки
            resetForm();
// Сбрасываем локальное состояние валидности
            setIsFormValid(false);
        },
// Валидация при потере фокуса
        validateOnBlur: true,
// Отключаем валидацию при изменении значения
        validateOnChange: false,
// Валидация при монтировании компонента
        validateOnMount: true,
    });

// Синхронизация локального состояния с Formik
    useEffect(() => {
        const errors = validate(formik.values);
// Обновляем isFormValid
        setIsFormValid(Object.keys(errors).length === 0);
    }, [formik.values]);

// Ручная валидация при изменении значений полей
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
// Обрабатываем изменение значения
        formik.handleChange(e);
        if (e.target.name !== 'terms') {
// Валидируем форму, кроме чекбокса
            formik.validateForm();
        }
    };

// Отдельная обработка для чекбокса
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// Обрабатываем изменение значения
        formik.handleChange(e);
// Валидируем только чекбокс
        formik.validateField('terms');
    };

// Отдельная обработка для поля "currency"
    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// Обрабатываем изменение значения
        formik.handleChange(e);
// Валидируем только поле "currency"
        formik.validateField('currency');
    };

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
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className={`${s.input} ${formik.touched.name && formik.errors.name ? s.errorInput : ''}`}
                />
                {formik.touched.name && formik.errors.name && (
                    <div className={s.error}>{formik.errors.name}</div>
                )}
            </label>


            <label htmlFor="email">
                Ваша электронная почта:
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className={`${s.input} ${formik.touched.email && formik.errors.email ? s.errorInput : ''}`}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className={s.error}>{formik.errors.email}</div>
                )}
            </label>

            <label htmlFor="amount">
                Сумма перевода:
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formik.values.amount}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className={`${s.input} ${formik.touched.amount && formik.errors.amount ? s.errorInput : ''}`}
                />
                {formik.touched.amount && formik.errors.amount && (
                    <div className={s.error}>{formik.errors.amount}</div>
                )}
            </label>

            <label htmlFor="currency">
                Валюта:
                <select
                    id="currency"
                    name="currency"
                    value={formik.values.currency}
                    onChange={handleCurrencyChange}
                    onBlur={formik.handleBlur}
                    className={`${s.input} ${formik.touched.currency && formik.errors.currency ? s.errorInput : ''}`}
                >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD - доллары</option>
                    <option value="EUR">EUR - евро</option>
                    <option value="TG">TG - тугрики</option>
                </select>
                {formik.touched.currency && formik.errors.currency && (
                    <div className={s.error}>{formik.errors.currency}</div>
                )}
            </label>

            <label htmlFor="text">
                Ваше сообщение:
                <textarea
                    id="text"
                    name="text"
                    value={formik.values.text}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className={`${s.input} ${formik.touched.text && formik.errors.text ? s.errorInput : ''}`}
                />
                {formik.touched.text && formik.errors.text && (
                    <div className={s.error}>{formik.errors.text}</div>
                )}
            </label>

            <label className={s.checkbox}>
                <input
                    name="terms"
                    type="checkbox"
                    checked={formik.values.terms}
                    onChange={handleCheckboxChange}
                    onBlur={formik.handleBlur}
                />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.touched.terms && formik.errors.terms && (
                <div className={s.error}>{formik.errors.terms}</div>
            )}

            <button
                type="submit"
                disabled={!isFormValid || formik.isSubmitting}
                className={s.button}
            >
                {formik.isSubmitting ? 'Отправка...' : 'Отправить перевод'}
            </button>
        </form>
    );
};