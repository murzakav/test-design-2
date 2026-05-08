# Motion + Agentation Demo

Демо-проект на React + `motion` (Motion.dev) с:
- примерами анимаций (`stagger`, `hover/tap`, `drag`, `AnimatePresence`, `scroll progress`);
- CI для GitHub Actions;
- workflow Agentation для ревью и автофиксов;
- конфигом деплоя на Vercel.

## Локальный запуск

```bash
npm install
npm run dev
```

Проверка перед PR:

```bash
npm run review:animations
```

Локальные автофиксы:

```bash
npm run fix:animations
```

## GitHub setup

```bash
git init
git add .
git commit -m "feat: bootstrap motion demo with agentation workflow"
git branch -M main
gh repo create motion-agentation-demo --source=. --private --push
```

## Vercel deployment

```bash
vercel
```

Для прод-деплоя:

```bash
vercel --prod
```

`vercel.json` уже настроен под Vite (`dist` как output).

### Публичный Agentation endpoint

Для локального запуска:

```bash
cp .env.example .env
```

Для публичного демо нужно задать `VITE_AGENTATION_ENDPOINT` как публичный URL вашего MCP/HTTP сервера (не `localhost`), иначе у внешних пользователей синхронизация аннотаций работать не будет.

## Agentation workflow

Файл: `.github/workflows/agentation-animation-review.yml`

- На каждый PR запускается `npm run review:animations`.
- Для ручного запуска автофиксов открой **Actions → Agentation Animation Review → Run workflow**.
- Job `fix` создаёт отдельный PR с изменениями через `peter-evans/create-pull-request`.
