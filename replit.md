# Gently Connect

Англоязычный статический лендинг с трёхшаговым квизом и добровольным переходом на партнёрский сайт. Проект не использует API, аккаунты, базу данных или серверное хранение ответов.

## Запуск и проверка

- Требуются Node.js 24 и pnpm 10.
- `pnpm install --frozen-lockfile` — установить зависимости.
- `pnpm --filter @workspace/dating-landing run typecheck` — проверить типы лендинга.
- `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/dating-landing run dev` — запустить Vite для Preview.
- `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/dating-landing run build` — собрать статические файлы.

В `.replit` Run настроен на команду Vite для лендинга. Сборка находится в `artifacts/dating-landing/dist/public/`; на VPS Nginx раздаёт эту папку.

## Где менять данные

- `artifacts/dating-landing/src/config.ts` — партнёрская HTTPS-ссылка, имя оператора, контакт и хостинг.
- `artifacts/dating-landing/src/App.tsx` — вопросы и тексты интерфейса.
- `artifacts/dating-landing/src/pages/legal.tsx` — политика и cookie-текст.
- `Инструкция по установке на сервер.md` — домен, REG.RU DNS, GitHub, Ubuntu/Nginx, HTTPS и обновления.

Партнёрская ссылка попадает в клиентскую сборку и видна посетителям. Не размещайте в исходниках секреты, токены или пароли. Не публикуйте сайт, пока фактические сведения об операторе и хостинге не внесены в конфигурацию и политику.
