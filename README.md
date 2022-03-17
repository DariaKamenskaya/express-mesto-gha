[![Tests for sprint 13](https://github.com/${DariaKamenskaya}/${express-mesto-gha}/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/${DariaKamenskaya}/${express-mesto-gha}/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/${DariaKamenskaya}/${express-mesto-gha}/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/${DariaKamenskaya}/${express-mesto-gha}/actions/workflows/tests-14-sprint.yml)
# Проект №7: express-mesto-gha
------
<ins>Описание проекта:</ins> бэкэенд приложения с авторизацией и регистрацией пользователя Mesto.
  
<ins>Функционал:</ins> Проект реализован на платформе Node.jsс использованием фреймворка Express.js. В качестве базы данных используется MongoDB (mongodb://localhost:27017/mestodb). В проекте выполнена API для авторизации и регистрации пользователя, API для работы с карточками (создание, удаление, проставление лайка). Защищены авторизацией все маршруты, кроме страницы регистрации и логина. При попытке неавторизованного пользователя обратиться к защищённому маршруту — возвращает 403 ошибку. API не возвращает хеш пароля. Реализована централизованная обработка ошибок. Валидированы приходящие на сервер запросы и данные на уровне схемы.
  
<ins>Стек:</ins> JavaScripts, Node.js, Express.js, ESLint, MongoDB, ООП, Git. 
  
## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
`/middlewares` — папка с файлами мидлвэр для авторизации и для валидации  
`/errors` — папка с файлами классами ошибок  
  
## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
