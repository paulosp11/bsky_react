# Docker Initiation
This folder contains the initiation task for Docker. 
We use Docker very heavily in the company as it provides isolation on the dev stack
without needing any overhead on performance.

**Note**: We have internally done these with PHP 7.4. To get something to show up on
the page, use the FPM tag. If you're doing task 3, don't use PHP 8 yet. Some
packages are not yet compatible with PHP 8. 

# Task 1:
Create a docker file that extends a popular language/framework/runtime that is natively supported
by Docker (by natively, we mean the docker org themselves manage the build images eg. nodejs, php)

If you are going to use PHP as your base image, and you want your container to 
show content on the browser, you'll also need to do task 2 at the same time to get
something to show up on your web browser.

The gist of this task is to have some simple code added to the base container and print something
when the container runs. You can do a simple hello world application that runs through docker.

Requirements for this task:
1. Extend a popular natively supported language/framework/runtime
2. Add some code for it to do something. This can be as simple as a hello world
3. Build that container and run it locally

# Task 2:
Write a docker compose file which has the following containers
- any database 
- any runtime application. You can use any language/framework you want that
is natively supported by Docker itself.

If you decide to pick something like PHP, you'll also need to run a separate container for a webserver like nginx.
This is an optional step for this task. If you setup something like nginx, then great it's a bonus.
Otherwise, just use nodejs.

For this task, you need to meet the following requirements:
1. Start up a database container that runs locally (host) on port 5000
2. Your application runs on port 9000
3. Internally connect from the application to the database and save something to the database

**Note:** It is important to know that the database needs to be able to persist data. If the container goes down, 
it should not lose data.

If you're an internal developer working on this task. Instead of doing the above item, you can get one of
our docker compose files, understand it, then explain it in your own words on what each part of it does.

# Task 3:
This task is designed more for the dev ops people. 

Create a docker image that has PHP installed as well
as 5 PHP core extensions and 2 PECL extensions. The extensions are listed below:
- php bcmath
- php opcache
- php pdo_mysql
- php enchant
- php gd
- pecl imagick
- pecl redis

We also require git to be installed

The required output of this is a dump of phpinfo();

Since this task is designed for a more dev ops position, you are required to show the phpinfo
from a web page. Therefore, you'll need to run everything through nginx  
