import { useFormik } from 'formik';
import s from './Login.module.scss';
import { validateEmail, validatePassword } from '../validation/validation.ts';

interface FormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const Login = () => {
    const formik = useFormik<FormValues>({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: Partial<FormValues> = {};

// Валидация email
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (validateEmail( values.email )) {
                errors.email = validateEmail( values.email);
            }

// Валидация пароля
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (validatePassword(values.password)) {
                errors.password = validatePassword(values.password);
            }

            return errors;
        },
        onSubmit: (values) => {
            const { email, password, rememberMe } = values;

            try {
// Диспатч действий для авторизации пользователя
                console.log(email, password, rememberMe);
// dispatch(loginAuthUsersTC(email, password, rememberMe));
// dispatch(setAuthUsersTC());
            } catch (error) {
                console.error('Error:', error);
            } finally {
                formik.resetForm();
            }
        },
// Валидация срабатывает только при потере фокуса
        validateOnBlur: true,
// Отключаем валидацию при изменении значения
        validateOnChange: false,
    });

    return (
        <form onSubmit={formik.handleSubmit} className={s.form}>
            <label className={s.label}>
                Email:
                <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Валидация срабатывает при потере фокуса
                    className={`${s.input} ${formik.touched.email && formik.errors.email ? s.errorInput : ''}`}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className={s.error}>{formik.errors.email}</div>
                )}
            </label>

            {/* Поле для ввода пароля */}
            <label className={s.label}>
                Password:
                <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Валидация срабатывает при потере фокуса
                    onFocus={() => {
                        // При фокусе на поле пароля, помечаем поле email как "тронутое"
                        if (!formik.touched.email) {
                            formik.setFieldTouched('email', true);
                        }
                    }}
                    className={`${s.input} ${formik.touched.password && formik.errors.password ? s.errorInput : ''}`}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className={s.error}>{formik.errors.password}</div>
                )}
            </label>
            <label className={s.checkboxLabel}>
                Remember me:
                <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    className={s.checkbox}
                />
            </label>
            <button
                type="submit"
// Кнопка отключена, если форма невалидна или отправка в процессе
                disabled={!formik.isValid || formik.isSubmitting}
                className={s.button} >
                Login
            </button>
        </form>
    );
};