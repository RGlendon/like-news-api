<h1 align="center">like-news-api</h1>

<p align="center">
    <img src="https://img.shields.io/badge/version-1.0.0-blue">
    <img src="https://img.shields.io/github/languages/top/RGlendon/like-news-api?style=flat&color=yellow">
    <img src="https://img.shields.io/github/stars/RGlendon/like-news-api.svg?style=flat&color=green">
</p>

_backend для дипломного проекта like-news-browser_

---
В данном репозитории представлена серверная часть проекта **like-news**. 
Используется модуль express в связке с MongoDB. Реализована двойная валидация данных, 
бережное хранение пароля с помощью bcryptjs, аутентификация и приняты меры против различных атак. 

### установка MongoDB

https://www.mongodb.com/try/download/community 

https://www.mongodb.com/try/download/compass

Создайте директорию для базы данных: 
```
cd /C
mkdir -p data/db
```

Добавьте путь к папке bin в переменную окружения: обычно путь к исполняемым файлам C:\Program Files\MongoDB\Server\4.2\bin
 
Официальная инструкция: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mdb-edition

### Локальный запуск
```
// в командной строке
mongod 

npm install --package-lock.json
npm run dev
```
 
### Как обратиться к серверу

- **http://localhost:4000/v1**


### API:

**Пользователь**:

* ```POST /signup``` создаёт пользователя с переданными в теле данными;

```
Code: 201
Content: {
            "data": {
                "email": "rold.glendon@gmail.com",
                "name": "Mikhail",
                "__v": 0
            }
}
```
* ```POST /signin``` возвращает JWT, если в теле запроса переданы правильные почта и пароль

```
Code: 200
Content: {
            "name": "Mikhail"
}
```


* ```GET /users/me``` возвращает информацию о пользователе (email и имя);

```
Code: 200
Content: {
            "data": {
                "email": "rold.glendon@gmail.com",
                "name": "Mikhail",
                "__v": 0
            }
}
```
**Статьи**:

* ```GET /articles```  все сохранённые пользователем статьи;

```
Code: 200
Content: {
             "data": [
                 {
                     "_id": "5edac357c1397b1bc046c678",
                     "keyword": "погода",
                     "title": "Заголовок",
                     "text": "Описание статьи",
                     "date": "сегодня 2020",
                     "source": "друг рассказал",
                     "link": "https://webformyself.com/function-declaration-i-function-expression-v-javascript/",
                     "image": "https://img3.goodfon.ru/original/2690x1780/f/e8/beautiful-landscape-les.jpg",
                     "__v": 0
                 },
                 ...
}
```
* ```POST /articles``` создаёт статью с переданными в теле данными;

```
Code: 201
Content: {
             "data": {
                 "_id": "5edac407c1397b1bc046c67b",
                 "keyword": "Путешествия",
                 "title": "Заголовок",
                 "text": "Описание статьи",
                 "date": "сегодня 2020",
                 "source": "друг рассказал",
                 "link": "https://webformyself.com/function-declaration-i-function-expression-v-javascript/",
                 "image": "https://img3.goodfon.ru/original/2690x1780/f/e8/beautiful-landscape-les.jpg",
                 "__v": 0
             }
}
```


* `DELETE /articles/articleId` удаляет сохранённую статью по `_id`

```
Code: 200
Content: {
             "data": {
                 "_id": "5edac357c1397b1bc046c678",
                 "keyword": "погода",
                 "title": "Заголовок",
                 "text": "Описание статьи",
                 "date": "сегодня 2020",
                 "source": "друг рассказал",
                 "link": "https://webformyself.com/function-declaration-i-function-expression-v-javascript/",
                 "image": "https://img3.goodfon.ru/original/2690x1780/f/e8/beautiful-landscape-les.jpg",
                 "__v": 0
             }
}
```
