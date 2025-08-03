# Ветка для бэка

Структура файлов:

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # Основной файл приложения
│   ├── models.py        # Модели данных
│   ├── generator.py     # Логика генерации моделей
│   └── config.py        # Конфигурация
├── requirements.txt     # Зависимости
└── .env                 # Переменные окружения
```

Установка зависимостей:

```bash
pip install -r requirements.txt
```

Запуск через unicorn:

```bash
uvicorn app.main:app --reload --port 8000
```