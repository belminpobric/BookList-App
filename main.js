//Book class : represents a book
class Book{
    constructor(title,author,BookID){
        this.author = author;
        this.title = title;
        this.BookID = BookID;
    }
}
//UI class : methods for UI tasks
class UI {
    static displayBooks() { 
        const books = Store.getItems();
        books.forEach((book)=>{
            UI.addBookToList(book);
        });
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.BookID}</td>
        <td><div class = "closeButton" 
        style = "width:20px; border-radius: 3px; cursor: pointer; background-color:red; color:white; text-align:center; float:right;">X</div></td>
        `;
        list.appendChild(row);
        
    }
    static clearFields(){
        const title = document.querySelector('#title').value = '';
        const author = document.querySelector('#author').value = '';
        const bookID = document.querySelector('#bookID').value = '';
    }
    static removeElement(el){
        if(el.classList.contains('closeButton')){
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(text,type){
        // const error = document.querySelector('#error');
        // error.className = `${type}`;
        // error.innerHTML = `${text}`;
        const div = document.createElement('div');
        div.className = `${type}`;
        div.appendChild(document.createTextNode(text));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(()=>{
            document.querySelector(`.${type}`).remove();
        },3000);
    }
}
//Store class : handles storage
class Store{
    static getItems(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addItem(item){
        let itemsarray = Store.getItems();
        itemsarray.push(item);
        localStorage.setItem('books',JSON.stringify(itemsarray));
    }
    static removeItem(BookID){
        const books = Store.getItems();
        books.forEach((book,index)=>{
            if(book.BookID === BookID){
                books.splice(index,1);//index of book and how much we want to splice (1)
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}
//Display books
document.addEventListener('DOMContentLoaded',UI.displayBooks());
//Add books
 function checkValues(title,author,BookID){ //check for empty values 
    if(title === '' || author === '' || BookID === ''){
        return true;
    }
    else {
    return false;
    }
}
const form = document.querySelector('#book-form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const BookID = document.querySelector('#bookID').value;
    if(!checkValues(title,author,BookID)){
        const book = new Book(title,author,BookID);
        UI.addBookToList(book);
        // clear the fields
        UI.clearFields();
        UI.showAlert('Book added','success');
        Store.addItem(book);
    } else {UI.showAlert('Please fill in all fields!','danger');}
        
});
//Remove books
const tbody = document.querySelector('#book-list');
tbody.addEventListener('click',(e)=>{
    UI.removeElement(e.target);
    Store.removeItem(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book removed.','success');

});
//search items
const searchBox = document.querySelector('#searchBox');
searchBox.addEventListener('click',(e)=>{
    // let strings = JSON.stringify(Store.getItems());
    let tbody = document.querySelector('#book-list');
    tbody.innerHTML = '';
});
searchBox.addEventListener('keyup',(e)=>{
    
    const book = Store.getItems();
    // let strings = JSON.stringify(Store.getItems());
    let tbody = document.querySelector('#book-list');
    tbody.innerHTML = '';
   for(let i = 0; i < book.length; i++){
    if(book[i].title.toLowerCase().includes(e.target.value.toLowerCase())){
            let tr = document.createElement('tr');
           tr.innerHTML = `
           <td>${book[i].title}</td>
           <td>${book[i].author}</td>
           <td>${book[i].BookID}</td>
           <td><div class = "closeButton" 
        style = "width:20px; border-radius: 3px; cursor: pointer; background-color:red; color:white; text-align:center; float:right;">X</div></td>
           `;
           tbody.appendChild(tr);        
    }
}
});