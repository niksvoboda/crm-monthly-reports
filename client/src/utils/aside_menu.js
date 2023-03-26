import {MAIN_ROUTE, USERS_ROUTE, CUSTOMERS_ROUTE, PROJECTS_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE,   LOGOUT_ROUTE} from "./routes";

export const aside_menu = [
        {link:MAIN_ROUTE, icon: 'dashboard', name: 'Главная' },        
        {link:CUSTOMERS_ROUTE, icon: 'receipt_long', name: 'Клиенты' },
        {link:USERS_ROUTE, icon: 'table_view', name: 'Пользователи' },
        {link:PROJECTS_ROUTE, icon: 'view_in_ar', name: 'Проекты' },
        {link:PROFILE_ROUTE, icon: 'format_textdirection_r_to_l', name: 'Настройки' }, 
        {link:SETTINGS_ROUTE, icon: 'person', name: 'Профиль' },
        {link:LOGOUT_ROUTE, icon: 'login', name: 'Выход' },
    ] 

