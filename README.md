#Заполнение google-таблицы
Для проверки заполнения таблицы необходимо отправить запрос:
POST http://HOST:PORT/google/sheets
Body:
{
    "id_sheet": [
        "ID"
    ]
}