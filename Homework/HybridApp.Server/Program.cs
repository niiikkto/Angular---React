using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Добавляем поддержку API-контроллеров
builder.Services.AddControllers();

// Настраиваем общую аутентификацию через Cookie
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "SharedAuth";
        // Path = "/" означает, что кука видна во всем домене: и для React, и для /angular
        options.Cookie.Path = "/"; 
    });

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseHttpsRedirection();

// Разрешает серверу отдавать статические файлы (HTML, JS, CSS) из папки wwwroot
app.UseStaticFiles(); 

app.UseRouting();

// Важно: аутентификация и авторизация строго между UseRouting и MapControllers
app.UseAuthentication();
app.UseAuthorization();

// Маршруты API (например, /api/users) — общие для обоих фронтендов
app.MapControllers();

// --- МАРШРУТИЗАЦИЯ ФРОНТЕНДОВ ---

// 1. Все запросы, начинающиеся с /angular, перенаправляем на index.html Angular-приложения
app.MapFallbackToFile("/angular/{*path}", "angular/index.html");

// 2. Все остальные запросы (корень сайта / и любые другие пути, не попавшие в /api и /angular)
// отдаем React-приложению
app.MapFallbackToFile("{*path}", "react/index.html");

app.Run();