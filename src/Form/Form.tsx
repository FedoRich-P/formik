import s from './Form.module.scss'

export const Form = () => {
    return (
        <form className={s.form}>
            <h2>Отправить перевод</h2>
            <label htmlFor="name"> Ваше имя
                <input
                    id="name"
                    name="name"
                    type="text"
                />
            </label>
            <label htmlFor="email">Ваша электронная почта
                <input
                    id="email"
                    name="email"
                    type="email"
                />
            </label>
            <label htmlFor="amount">Сумма перевода
                <input
                    id="amount"
                    name="amount"
                    type="number"
                />
            </label>
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency">
                <option value="">Выберите валюту</option>
                <option value="USD">USD - доллары</option>
                <option value="EUR">EUR - евро</option>
                <option value="TG">TG - тугрики</option>
            </select>

            <label htmlFor="text">Ваше сообщение
                <textarea
                    id="text"
                    name="text"
                />
            </label>
            <label className={s.checkbox}>
                <input name="terms" type="checkbox"/>
                Соглашаетесь с политикой конфиденциальности?
            </label>
            <button type="submit">Отправить перевод</button>
        </form>
    )
}
