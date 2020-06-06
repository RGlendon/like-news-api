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
бережное хранение пароля с помощью brypctjs, аутентификация и приняты меры против различных атак.  
 
### Локальный запуск
```
mongod // в командной строке

npm install --package-lock.json
npm run dev
```
 
### Как обратиться к серверу

- **http(s)://api.like-news.ga/api/...**


### API:

**Пользователь**:

* ```POST /signup``` создаёт пользователя с переданными в теле данными;

```
Code: 201
Content: {
            "data": {
                "_id": "5eda9ba17dfa0b1d647c4dc9",
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
            "message": "Вы залогинены!"
}
```


* ```GET /users/me``` возвращает информацию о пользователе (email и имя);

```
Code: 200
Content: {
            "data": {
                "_id": "5eda9ba17dfa0b1d647c4dc9",
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
                 "owner": "5eda9ba17dfa0b1d647c4dc9",
                 "__v": 0
             }
}
```
