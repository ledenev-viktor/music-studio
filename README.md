# Music studio

## To run the project in the root create .env file. It should contain few values (without quotes):

```
  PRIVATE_KEY=value
  CLIENT_EMAIL=value
  BASE_URL=http://localhost:3000/
  CALENDAR_ID=value

  # For google OAuth2 purposes
  GOOGLE_ADMIN_CLIENT_ID=value
  GOOGLE_ADMIN_CLIENT_KEY=value

  # for auth redirect purposes
  NEXTAUTH_SECRET="secret"
  NEXTAUTH_URL="http://localhost:3000/"

  # supabase
  NEXT_PUBLIC_SUPABASE_URL=value
  NEXT_PUBLIC_SUPABASE_ANON_KEY=value
```

> [!CAUTION] > **Do not commit the .env file**: Be very careful here!

<p>
Проект представляет собой landing page с возможностями просматривать новости, информацию и контакты студии, 
а для авторизованных пользователей возможность записаться на занятие с выбором времени занятия из предложенных.
Контент будет заполняться через админ-панель.
</p>
