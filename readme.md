Создаем папку CYPRESS_TEST. Устанавливаем cypress и все расширения. Потом добавляем нужные папки из шаблона.
Переходим в терминале в папку CYPRESS_TEST. Все остальные команды вводим в терминале этой папки.
Поставить ноду:
В терминал вводим команду wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh
(https://github.com/nvm-sh/nvm#install--update-script)
Проверка что все установлено node -v
Нода должна быть 16 или старше версии.

Инициализируем проектную директорию ( npm init )
Терминал задаст вам ряд вопросов, жмем Enter, применятся значения по умолчанию. Когда вы это сделаете, в проектной папке появится файл package.json, содержащий все детали ваших ответов на вопросы, все кастомные скрипты и список пакетов – он будет пустым. 

Устанавливаем все расширения одной командой. Если есть желание то можно ставить их последовательно(см.ниже)
npm install cypress -dev; yarn install; yarn upgrade cypress@9.4.1 #(указываем актуальную версию); npm install chai-colors; npm install --save-dev cypress-file-upload; npm install -D cypress-xpath ; npm i -D cypress-grep

    Устанавливаем cypress ( npm install cypress -dev )
    Флаг –dev говорит Cypress устанавливаться с dev-зависимостью – это значит, что он требуется только для разработки.

    yarn install - устанавливаем пакет с зависимостями (нужно обязательно для работы расширений)
    yarn upgrade cypress@10.0.1 - обновляем пакет (указываем актуальную версию)

    Ставим расширение для тестирования цвета надписей
    npm install chai-colors

    Ставим расширение для загрузки внешних файлов
    npm install --save-dev cypress-file-upload

    Расширение для использования xpath
    npm install -D cypress-xpath

    Плагин для работы с тегами
    npm i -D cypress-grep

После установки расширений:
Инициализируем cypress ( npx cypress open )
npx – эта команда объединена с npm и позволяет куда быстрее запускать Cypress. Введя ее, вы получите строку текста в терминале, сообщающую, что вы запускаете Cypress для этого проекта впервые. Затем она пропадет, настроит много чего еще, и когда все это закончится, Cypress стартует! У нас появится новый модный дашборд, но что еще важнее – в проекте появится новая папка и файлы, которые можно начинать использовать.

Для запуска всех автотестов введите в терминале команду npx cypress run  --browser chrome 
Дождитесь прохождения первого автотеста. В первом скрипте генерится множество сущностей и проверяется интеграция с wms. Если он упал то остальное прохождение тестов становится бессмысленным.

Теги
Для запуска автотестов по тегам введите npx cypress run --env grepTags="smoke" --browser chrome где вместо smoke можете добавить свой ранее проставленный тег. Будут пройдены только тесты с тегом, остальные пропущенны как отложенные.
Сейчас реализованы 3 глобальных тега:

smoke - набор основных тестов.Тесты уникальны и проверяют рабоспособность в основном под админом.

rights - тесты прав. Проверяют в основном что различные сущности видят положенный им функционал. Часть тестов повторяет тесты smoke но под другими сущностями. Для активации нужно запустить тесты 001_Warehouses

Будет запущен прогон тестов в браузере хром. Для изменения браузера введите другой вариант.См офф документацию.

Для запуска тестов руками с показом экрана введите npx cypress open. Перейдите в e2e есты и запускайте последовательно тестовые наборы.

Описание базовых файлов в cypress
cypress/fixtures

cypress/integration

cypress/plugins

cypress/support

И в корневой папке будет файл конфигурации:

foldername/cypress.json

В папке Integration будут жить ваши тесты. Внутри нее можно создавать новые папки, чтобы структурировать тесты так, как вам надо, но все тесты всегда должны находиться только внутри этой папки. Cypress автоматически подхватит все .js-файлы из этой папки и добавит их на дашборд. Если вы запускаетесь через Cypress CLI, то тесты автоматически подхватятся, если вы прогоняете все тесты и не пользуетесь кастомными командами.
Папка Fixtures будет содержать все нужные вам данные в JSON-формате. Это могут быть ответы на запрос или другие специальные данные, но они должны храниться в формате JSON.
В папке Plugins по умолчанию находится единственный файл – index.js, и для 90% тест-задач его вам хватит за глаза. В этот индекс-файл будут добавляться все плагины, которые нужны вам на глобальном уровне.
И, наконец, папка Support. Она похожа на папку Plugins, в ней тоже лежит индекс-файл, нужный для объявления глобальных модулей, которые вы не хотите импортировать для каждого файла. Также там находится файл команд, в котором можно создавать кастомные команды для Cypress. Они пригодятся для расширения Cypress или описания нужных вам методов.

В файле cypress.json скрипт ("retries": 1) отвечает за перезапуск упавших тестов.Цифра это количество перезапусков.

Метки
it.skip - пропустить тест
it.only - запускать только этот тест
