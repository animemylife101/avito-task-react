Необходимо сверстать адаптивную страницу со списком фотографий.

При клике на фотографии открывается модальное окно с фотографией, списком комментариев и формой добавления комментариев.

Список ручек:

GET https://boiling-refuge-66454.herokuapp.com/images - получение списка фотографий.
<br />
GET https://boiling-refuge-66454.herokuapp.com/images/:imageId - получения большого изображения и списка комментариев.
<br />
POST https://boiling-refuge-66454.herokuapp.com/images/:imageId/comments - добавление комментария (204 – OK, комментарий не сохраняется).

Дизайн можно найти <a href = 'https://www.figma.com/file/3VP0QDK3kjdfbkj8TRrtsx/Test-task?node-id=0%3A2'>тут</a>.

Ответы на вопросы по заданию можно найти <a href="mailto:varkadov@avito.ru">тут</a>.​

Мы оценим если:

приложение будет работать локально после npm i && npm run start;
приложение написано на React;
не используются внешние компоненты, например, модальное окно;
учтен UX.
