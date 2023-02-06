import { HomePage } from "./HomePage";


//страница авторизации
export const AuthPageLoc = {
    LOGIN_FIELD: "#login", // Поле логин
    PASSWORD_FIELD:'#password', // Поле пароль
    ENTER_BTN:'button[type="submit"]' // Кнопка Вход
};

//общие элементы
export const BasePageLoc = {
    url: 'https://alfabank.ru/', //url
};

//страница главного меню
export const HomePageLoc = {
    VKLAD_BTN_XP:'//a[text()="Вклады"]',
    CREDIT_BTN:'[title="Кредиты"]'
};

//страница вкладов
export const VkladPageLoc = {
    NAC_PR_BTN_XP:"//h1[text()='Накопительные продукты']",
};

