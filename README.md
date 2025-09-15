# Patient Registration App
## Backend
### with docker:
cd patient-registration-backend  
```docker compose up -d --build  ```  
Laravel will run in localhost:8080/api
### without docker:
```php artisan migrate  ```  
```php artisan queue:table```  
```php artisan migrate```  
```php artisan storage:link```  
```php artisan serve```  
In another terminal run the worker for asynchronus mailing:  
```php artisan queue:work --tries=3```   
Laravel will run in localhost:8000/api


## Frontend  
create a .env file based in .env.example  
```npm install```  
```npm run dev```  
React will run in localhost:5173


