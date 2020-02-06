# saving-app
It's a semester project for Design of Multimedia Systems module at university.

This web app is not yet completed perfectly and this is second attempt at working with *react js* and my first application.

*What it does*

It is a saving web app that lets you register your expenses and follow your saving journey. 
The app lets you see how much you should be saved according to your given monthly income and your registered expenses. 

*How to use*

Firstly, this page won't work without database, so you have to run `php artisan migrate` in the backend folder and the `php artisan serve` to make database accesible.
I haven't yet made online server for this but in a future maybe I will.

Secondly, after you run front end, you have to register or sign in. Then the web page lets you choose a plan. Write down how much you want to save and your monthly income.
The calculation will show you when you will save the wanted sum you typed.

