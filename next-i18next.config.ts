import { UserConfig } from 'next-i18next';

export const i18n: UserConfig['i18n'] = {
  locales: ['en', 'ru', 'uz'], // Поддерживаемые языки
  defaultLocale: 'en', // Язык по умолчанию
};

export const reloadOnPrerender = true;
