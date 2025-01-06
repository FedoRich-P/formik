type Error = {
    name?: string;
    email?: string;
}
// Валидация общая
export const validate = (values : Error) => {
    const errors: Error = {}
    if (!values.name) {
        errors.name = 'Обязательное поле ввода'
    } else if (values.name.length < 3) {
        errors.name = 'Минимум 2 символа для заполения'
    }

    if (!values.email) {
        errors.email = 'Обязательное поле ввода'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.name = 'Неправильный email адрес';
    }

    return errors;
}
// Валидация email
export function validateEmail(email: string): string | undefined {
    email = email.trim(); // Убираем лишние пробелы
    // Основные проверки
    switch (true) {
        case !email:
            return 'Обязательное поле ввода';
        case !email.includes('@'):
            return 'Email должен содержать символ @';
        default:
            const [localPart, domainPart] = email.split('@');
            // Проверка локальной части (до @)
            switch (true) {
                case !localPart:
                    return 'Введите часть email до символа @';
                case localPart.length > 64:
                    return 'Часть до @ слишком длинная';
                case !/^[A-Z0-9._%+-]+$/i.test(localPart):
                    return 'Часть до @ содержит недопустимые символы';
                default:
                    // Проверка доменной части (после @)
                    switch (true) {
                        case !domainPart:
                            return 'Введите домен после символа @';
                        case domainPart.length > 253:
                            return 'Домен слишком длинный';
                        case !domainPart.includes('.'):
                            return 'Домен должен содержать точку (например, example.com)';
                        case domainPart.endsWith('.'):
                            return 'Домен не может заканчиваться точкой';
                        case !/^[A-Z0-9.-]+$/i.test(domainPart):
                            return 'Домен содержит недопустимые символы';
                        case !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email):
                            return 'Неправильный email адрес';

                        default:
                            return undefined;
                    }
            }
    }
}
// Валидация имени
export function validateName(name: string) {
    if (!name) {
        return 'Обязательное поле ввода'
    } else if (name.length < 3) {
        return 'Минимум 2 символа для заполения'
    }
    return undefined;
}
// Валидация пароля
export const validatePassword = (password: string): string | undefined => {
    if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }
    return undefined;
};
// Валидация валюты
export const validateCurrency = (currency: string): string | undefined => {
    if (!currency) {
        return 'Выберите валюту';
    }
    return undefined;
};
// Валидация суммы
export const validateAmount = (amount: number): string | undefined => {
    if (!amount) {
        return 'Укажите сумму перевода';
    } else if (amount <= 0) {
        return 'Сумма должна быть больше нуля';
    }
    return undefined;
};
// Валидация сообщения
export const validateText = (text: string): string | undefined => {
    if (!text) {
        return 'Введите сообщение';
    } else if (text.length < 10) {
        return 'Сообщение должно содержать минимум 10 символов';
    }
    return undefined;
};
// Валидация чекбокса
export const validateTerms = (terms: boolean): string | undefined => {
    if (!terms) {
        return 'Необходимо согласиться с политикой конфиденциальности';
    }
    return undefined;
};