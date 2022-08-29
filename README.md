## Структура проекта
```
├── components/                     — Папка компонентов
|   ├── Component/                  — Компонент
    |   ├── Component.constants.ts  — Константы 
    |   ├── Component.i18n/         — Переводы
    |   |    ├── ru.ts           
    |   |    ├── en.ts           
    |   |    └── ...
    |   ├── Component.hooks/        — Хуки
    |   |    ├── useUpdate.ts    
    |   |    └── ...
    |   ├── Component.styles.ts     — Стили      
    |   ├── Component.tests/        — unit-тесты
    |   |    ├── index.ts        
    |   ├── Component.typings/.ts   — Интерфейсы     
    |   ├── Component.utils/        — Хелперы
    |   |    ├── firstUtil.ts    
    |   |    └── ...
    |   ├── index.tsx               — Компонент
├── hooks/                          — Глобальные хуки
├── shared/                         — Переиспользуемые компоненты
|   ├── Component/                  — Реакт компонент
    |   |    └── ...                — Вся структура как для обычной компоненты
├── pages/                          — Страницы приложения
|   ├── ComponentPage/              — Реакт компонент
    |   |    └── ...                — Вся структура как для обычной компоненты
├── store/                          — Стор редакса
|   ├── index.ts                    — Файл стора
    ├── slices/                     — Слайсы
    |   ├── slice/               
    |   |   ├── slice.ts         
    |   |   ├── slice.typings.ts    — Интерфейсы для слайса
    |   └── ...  
|   ├── rootSlice.ts                — Рутовый слайс
├── utils/                          — Глобальные утилиты
|   ├── firstUtil.ts             
|   └── ...        
├── providers/                      — Провайдеры
|   ├── ThemeProvider.tsx        
|   └── ...        
├── declare/                        — Декларацаии интерфейсов
|   ├── react.d.ts               
|   └── ...      
├── styles/                         — Глобальные css стили
|   ├── style.css               
|   └── ...
```