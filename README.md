**YoutubeSPA**
(eng/rus)

</br>
**English**

**Description**: 

Authorized users can request videos from Youtube. Requests are stored in the database. Request can be added to favorites, deleted and edited


"YoutubeSPA" is a one-page web application (SPA) designed to work with video content from the YouTube platform. This app allows users to view, search and play YouTube videos.

**The main features and functionality** of the project include:

&bull; Video Search: users can use the search bar to search for YouTube videos by keywords or phrases.
 
&bull; Video watching: after searching or viewing popular videos, users can watch selected videos in a built-in video player.

&bull; Pagination of search results: if you have a large number of search results or videos, the project provides pagination for easy navigation on results.

&bull; Video Display: each video is provided with brief information such as name, description, download date and number of views.

&bull; Integration with YouTube API: to access YouTube data and functionality, YouTube API is used, which provides access to video, channels, playlists, and other data.


**Technologies used:** 

    Framework: express
    Work with databases: postgreeSQL, sequelize
    Encryption and authorization: bcrypt, jwt
    Documentation: swagger 
    Other: axios, cache-manager, lodash, cors

**The database**

The database schema consists of 3 tables:

    User
    Query (consists all user's queries)
    SavedQuery (consists only saved queries)

There are relationships between the tables:

    Between User и Query - one-to-many
    Between  Query и SavedQuery - one-to-many


![alt text](README.image/DBSchema.jpg)


</br>

**Russian**

**Описание**: 

Авторизованные пользователи могут запрашивать видео с youtube. Запросы хранятся в базе данных. Запрос можно добавить в избранное, удалить и отредактировать


"YoutubeSPA" - это одностраничное веб-приложение (SPA), разработанное для работы с видео-контентом с платформы YouTube. Это приложение позволяет пользователям просматривать, искать и воспроизводить видео с YouTube.


**Основные возможности и функциональность** проекта включают в себя:

&bull; Поиск видео: Пользователи могут использовать поисковую строку  для поиска видео на YouTube по ключевым словам или фразам. 
 
&bull; Просмотр видео: После выполнения поиска или просмотра популярных видео, пользователи могут просматривать выбранные видео во встроенном видеоплеере.

&bull; Пагинация результатов поиска: При наличии большого количества результатов поиска или видео, проект обеспечивает пагинацию для удобного навигации по результатам.

&bull; Отображение информации о видео: Каждое видео снабжено краткой информацией, такой как название, описание, дата загрузки и количество просмотров.

&bull; Интеграция с API YouTube: Для доступа к данным и функциональности YouTube используется YouTube API, который обеспечивает доступ к видео, каналам, плейлистам и другим данным.


**Использованые технологии:** 

    Фреймворк: express
    Работа с базами данных: postgreeSQL, sequelize
    Шифрование и авторизация: bcrypt, jwt
    Документация: swagger 
    Другие: axios, cache-manager, lodash, cors

**База данных**

Схема базы данных состоит из 3-х таблиц: 

    User (пользователи)
    Query (со всеми запросами пользователя)
    SavedQuery (с сохраненными запросами)

Между таблицами установлены связи : 

    Между User и Query - один-ко-многим
    Между  Query и SavedQuery - один-ко-многим


![alt text](README.image/DBSchema.jpg)
