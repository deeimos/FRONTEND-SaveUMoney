import { ILocalization } from "./type";

export const localization: ILocalization = {
  ok: 'Ок',
  error: 'Ошибка',
  add: "Добавить",
  update: "Изменить",
  delete: "Удалить",
  logout: "Выйти",
  auth: {
    authorization: "Авторизация",
    registration: "Регистрация",
    isRegistred: 'Уже есть аккаунт?',
    isNotRegisted: 'Еще нет аккаунта?',
    buttonLogin: 'Войти',
    buttonRegister: 'Зарегистрироваться',
    userAlredyExist: 'Пользователь с такой электронной почтой уже зарегистрирован',
    userNotFound: 'Неверный адрес электронной почты',
    invalidPassword: 'Неверный пароль',
    registerMessage: 'Вы успешно зарегистрировались!',
    validation:
    {
      skipedUserName: "Не введено имя",
      invalidUserName: "Длина имени должна быть минимум 2 символа",
      skipedEmail: "Не введен адрес электронной почты",
      invalidEmail: "Неверный email",
      skipedPassword: "Не введен пароль",
      smallLenPassword: "Длина пароля должна быть минимум 8 символов",
      invalidPassword: "Пароль должен содержать хотя бы одну букву нижнего регистра, хотя бы одну высокого регистра и хотя бы одну цифру",
      skipedRepeatPassword: "Пароли должны совпадать",
      notEqualRepeatPassword: "Повторите пароль",
    },
  },
  bills: {
    bills: "Счета",
    name: "Название",
    description: "Описание",
    value: "Средств на счету",
    add: "Добавить счёт",
    addError: "Лимит счетов: 6",
    invalidName: "Имена счетов должны быть уникальными"
  },
}