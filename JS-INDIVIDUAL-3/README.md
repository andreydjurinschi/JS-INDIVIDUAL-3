
## Отчет по индивидуальной работе N3
#### Студент группы I2302 : Джуринский Андрей
#### Преподаватель: Нартя Никита


## Цель

Ознакомить студентов с основами взаимодействия JS с DOM-деревом на основе веб-приложения для **учета личных финансов**.

## Создание среды разработки
Первым делом я создал три файла:
`index.html`
`script.js`
`style.css`
и подключил их к html странице
## Массив transactions
Далее я создал массив transactions, который будет содержать в себе объекты моих транзакций
```js
let  transactions  = [
{
id:  '1',
date:  '10:05:2024',
category:  'Покупка',
amount:  -25,
description:  'Купил сметаны в Фидеско'
}
]
```
## Таблица
Затем я построил html таблицу, строка которой поделена на столбцы идентичные ключам моей транзакций, однако по заданию добавляем еще один столбец Action(Delete)
```html
<table  id="tr_table">
<tr>
<th>ID</th>
<th>Date / Time</th>
<th>Category</th>
<th>Amount</th>
<th>Description</th>
<th>Action</th>
</tr>
<tbody  id="tr_body">
</tbody>
</table>
```
## Функции() 
Я немного поменял данные условия:
1. Создайте функцию `addTransaction()`,
2. В функции `addTransaction()`:
	1. Создайте объект транзакции с данными из формы.
	2. Добавьте созданный объект в массив transactions.
3. Создайте новую строку таблицы с данными из объекта транзакции и добавьте её в таблицу.
4. Если транзакция совершена на положительную сумму, то строка таблицы должна быть зеленым цветом, иначе красным
5. В колонке `description` отображайте краткое описание транзакции (первые 4 слова).

Во-первых, я разбил данную функцию на две (одна для добавления транзакции в массив, другая для ее добавления в мою таблицу). Транзакции я создал отдельно:
```js
let  newTransaction  = {
id:  '2',
date:  '11:05:2024',
category:  'Нашел кошелек бабушки',
amount:  80,
description:  'Очень доволен, бабушка не заподозрила'
}

let  newTransaction1  = {
id:  '3',
date:  '13:05:2024',
category:  'Купил пельмени',
amount:  -40,
description:  'Очень доволен, очень вкусно'
}

let  newTransaction2  = {
id:  '4',
date:  '09:05:2024',
category:  'Вернули долг',
amount:  600,
description:  'Свои долги простительны'
}
```
### Функция, добавляющая транзакцию в массив:
```js
function  addTransactionInArray(newTransaction) {
transactions.push(newTransaction)
addTrInTable()
}
```
Даная транзакция просто принимает в качестве аргумента объект новой транзакции и при помощи метода `push` добавляет ее в массив. 
### После ее добавления вызывается функция `addTrInTable()` 
```js
function  addTrInTable() {

let  tbody  =  document.getElementById("tr_body")
tbody.innerHTML  =  ''

transactions.forEach(transaction  => {
let  row  =  document.createElement('tr')
Object.values(transaction).forEach(value  => {
let  part  =  document.createElement('td')
part.textContent  =  value
row.append(part)
})

if (transaction.amount  <  0) {
row.style.backgroundColor  =  '#FF4040'
} else {
row.style.backgroundColor  =  '#217d21'
}

let  delete_btn  =  document.createElement('button')
delete_btn.textContent  =  'Удалить'
row.append(delete_btn)
tbody.append(row)
})
calculateTotal()
updateAmount()
}
```
_____________
```js
let  tbody  =  document.getElementById("tr_body")
tbody.innerHTML  =  ''
```
присваиваю переменной `tbody` тело моей таблицы. Затем обнуляю его, то-есть:
`innerHTML` определяет дочерние элементы, находящиеся в `tbody` . Я их сбрасываю, чтобы при добавлении новой транзакции у меня не дублировались старые.
```js
transactions.forEach(transaction  => {
let  row  =  document.createElement('tr')
Object.values(transaction).forEach(value  => {
let  part  =  document.createElement('td')
part.textContent  =  value
row.append(part)
})
```
Сначала для каждой транзакции создаю ее собственную строку. Далее использую метод `Object.values` для извлечения свойств каждого объекта из массива. Затем создаю переменную part, которая является ячейкой и для каждого свойства создаю такую новую ячейку. Затем при помощи метода `textContent` я вставляю в ячейку текст моего свойства. `row.append(part)` вставляет все свойства одной транзакции в строку.
```js
if (transaction.amount  <  0) {
row.style.backgroundColor  =  '#FF4040'
} else {
row.style.backgroundColor  =  '#217d21'
}
```
Здесь я проверяю цену моей транзакции. Если она отрицательная, то строка со всеми значениями транзакции становится красной, если положительная, то зеленой
```js
let  delete_btn  =  document.createElement('button')
delete_btn.textContent  =  'Удалить'
row.append(delete_btn)
tbody.append(row)
```
Не забываю и про кнопку для удаления, где я создаю элемент, затем меняю его текстовое содержимое и при помощи `append` добавляю его в свою строку наравне с транзакцией.  ` tbody.append(row)`  - добавляет строку в тело моей таблицы
### Функция для удаления транзакции по id
```js
function  deleteTransaction(id) {
for (let  i  =  0; i  <  transactions.length; i++) {
let  element  =  transactions[i]
if (element.id  ===  id) {
transactions.splice(i, 1)
break
		}
	}
}
```
Здесь мы проходимся по каждой транзакции в массиве и сравниваем его id , если его id совпадает с id желаемой для удаления транзакции, то метод `splice(i,1)` изменяет мой массив, удаляю транзакцию с индексом `i`. 1 - кол-во удаляемых элементов
```js
document.getElementById("tr_table").addEventListener('click', (event) => {
if (event.target.tagName  ===  "BUTTON") {
let  tr  =  event.target.closest('tr')
let  id  =  tr.querySelector('td:first-child').textContent
deleteTransaction(id)
tr.remove()
updateAmount()
}
})
``` 
Мало написать функцию, так же нужно создать обработчик событий. ВЫшеперечислоенный блок кода добавляет на мою таблицу событие, что при клике на элемент с тегом `button` мы ищем ближайший родительский элемент для строки, в которой была нажата кнопка, затем извлекаем текстовый идентификатор моей первой ячейки (id каждой транзакции), далее вызываем функцию `deleteTransaction` и так же удаляем и саму строку

### Функции для вычисления общей стоимости всех транзакций
```js
function  calculateTotal() {
let  total  =  0;
for (let  i  =  0; i  <  transactions.length; i++) {
const  amount  =  transactions[i].amount
total  +=  amount
}
return  total
}
function  updateAmount() {
const  total  =  calculateTotal()
const  id_sum  =  document.getElementById('total_amount')
id_sum.textContent  =  total
}
```
Создаю переменную для хранения общей суммы, затем пробегаюсь по каждой транзакции и  свойство `amount` складываю с переменной `total`, которую потом и возвращаю. 
Функция `updateAmount` мне нужна для обновления текстового блока на моей веб странице. Она создает переменную равную результату функции `calculateTotal`, затем ищет мой текстовый блок по `id` и `textContent` приравнивает к переменной total.
```html
<center><h2>Общая сумма:</h2></center>
<center><h2  id="total_amount">0</h2></center>
```
### Функция для вынеса описания транзакции в отдельный блок
```js
document.getElementById("tr_table").addEventListener('click', (event) => {
if (event.target.tagName  ===  "TD"  &&  event.target.parentNode.tagName  ===  "TR") {
const  tr  =  event.target.parentNode
const  description  =  tr.querySelector('td:nth-child(5)').textContent
const  transactionDescription  =  document.getElementById('tr_description')
transactionDescription.textContent  =  description
}
})
```
Для каждой строки моей таблицы я добавляю событие, что при нажатии если имя моего тега равно `TD`, то мы получаем родительский элемент для `td` - `tr`.
Далее создается переменная для хранения описания, которая равна текстовому контенту `td:nth-child(5)` - моей 5й ячейке. Дальше просто дублирую это текстовое содержание в другому `html` теге.
```html
<center><div  id="tr_details">
<h2>Подробное описание транзакции</h2>
<p  id="tr_description"></p>
</div></center>
```
### Ответы на контрольные вопросы
1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?
Основные доступы к элементам на странице можно получить следующим образом:
-   `document.getElementById(id)`: получает элемент по его идентификатору.
-   `document.getElementsByClassName(className)`: получает сборник элементов по их классу.
-   `document.getElementsByTagName(tagName)`: получает сборник элементов по их тегу.
-   `document.querySelector(selector)`: получает первый элемент, соответствующий CSS-селектору.
-   `document.querySelectorAll(selector)`: получает все элементы, соответствующие CSS-селектору.
- и другие
2. Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?
Делегирование событий является полезным шаблоном, так как позволяет отслеживать события на множестве элементов с помощью только одного обработчика
3. Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?
Для изменения содержимого элемента DOM с помощью JS мы можем использовать свойство `textContent` для установки текстового содержимого или свойство `innerHTML` для установки HTML-разметки.
4. Как можно добавить новый элемент в DOM дерево с помощью JavaScript?
5. Для добавления нового элемента в DOM дерево с помощью JS, мы должны сначала создать элемент с помощью метода `document.createElement(tagName)`, а затем его добавить при помощи `appendChild` в конец родительского элемента
