# nodejs-restapi-with-mongo
sample nodejs api with mongoDB
# how to build
- install node
```sh
$cd <project dir>
$npm install
```
# how to run
```sh
$cd <project dir>
$npm start
```
# test the application
all APIs are available on port 3000
# Sample APIs to use
| API | Method | SAMPLE DATA |
| ------ | ------ | ------ |
| http://localhost:3000/user/signup        | POST | {	"email": "c3@d.com",	"password": ""} |
 | http://localhost:3000/user/login        | POST | {	"email": "c3@d.com",	"password": ""} |
 | http://localhost:3000/products     | GET | |
 | http://localhost:3000/products     | POST |  Request Type: form data and expect 	name,	price and productImage field in request |
 | http://localhost:3000/products/:id | PATCH | [{	"propName" : "name",	"value": "brain3"}]
 | http://localhost:3000/products/:id | GET | |
 | http://localhost:3000/products/:id | DELETE | |
 | http://localhost:3000/orders       | GET | |
 | http://localhost:3000/orders       | POST | {	"productId" : "5dff46cd37aa77004d07418c",	"qty": "2"} |
 | http://localhost:3000/orders/:id   | DELETE | |
 | http://localhost:3000/orders/:id   | GET | |
