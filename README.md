# Gently Connect

Англоязычный статический лендинг с коротким квизом и отдельным переходом на партнёрский сайт. Ответы на вопросы не отправляются на сервер; для работы страницы не нужны база данных или API.

## Запуск в Replit

В `.replit` настроен Run для приложения `@workspace/dating-landing`. Откройте проект в Replit и нажмите **Run** — страница запустится в Preview.

## Локальная проверка и сборка

Нужны Node.js 24 и pnpm 10:

```sh
pnpm install --frozen-lockfile
pnpm --filter @workspace/dating-landing run typecheck
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/dating-landing run build
```

Для локального предпросмотра:

```sh
pnpm --filter @workspace/dating-landing run dev
```

Production-сборка создаётся в `artifacts/dating-landing/dist/public/`. Серверу нужен только Nginx с этой папкой; Node.js нужен на VPS для сборки и обновлений.

## Перед публикацией

В `artifacts/dating-landing/src/config.ts` заполните `PARTNER_URL`, `SITE_OPERATOR_NAME` и `HOSTING_PROVIDER`, проверьте публичный контакт и условия партнёрской сети. Не оставляйте шаблонные поля в политике. Репозиторий публичный: не коммитьте пароли, API-ключи или другие секреты.

Полный порядок покупки домена, DNS в REG.RU, установки на Ubuntu/VPS и дальнейшего обновления из GitHub описан в [инструкции по установке](Инструкция%20по%20установке%20на%20сервер.md).
