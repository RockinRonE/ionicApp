import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class TodolistService {

  constructor(private storage: Storage) { }

  save(data) {
      let stringData = JSON.stringify(data); 
      console.log(stringData, 'data being saved into DB');
      this.storage.set('todolists', stringData); 
  }  


  getData(): Promise<any> {
      return this.storage.get('todolists');

  }



  // getTodolist(todolist, item) {
  //    this.getData().then(todolists => {

  //      let parsedTodolists = JSON.parse(todolists);

  //      const post = this.findTodolist(todolist.name, parsedTodolists);
  //      post.items.push(item);
  //      console.log(todolists, 'todolists from getTodolist()');
  //      console.log(post, 'from getTodolist()'); 
  //      this.save(post); 

       
  //    }); 

  // }

  

  renameTodolist(todolist, name) {
     this.getData().then(todolists => {
       let parsedTodolists = JSON.parse(todolists);
       
       let index = parsedTodolists.find(post => post.name === todolist.name); 
       index.name = name; 
       this.save(parsedTodolists);

   });
  }

  deleteTodolist(todolist) {
    this.getData().then(todolists => {
       let parsedTodolists = JSON.parse(todolists);
       
       let index = parsedTodolists.findIndex(post => post.name === todolist.name); 
       parsedTodolists.splice(index, 1); 
       this.save(parsedTodolists); 
       debugger; 

   });
  }

  saveItem(todolist, item) {
    this.getData().then(todolists => {
     let parsedTodolists = JSON.parse(todolists);

      let index = parsedTodolists.findIndex(post => post.name === todolist.name); 
      parsedTodolists[index].items.push(item); 
      this.save(parsedTodolists); 
      
    })
  }

  renameItem(todolist, item, newItemName) {
    this.getData().then(todolists => {
     let parsedTodolists = JSON.parse(todolists);

      let index = parsedTodolists.findIndex(post => post.name === todolist.name); 

      parsedTodolists[index].items.push(item); 
      this.save(parsedTodolists); 
      
    })
  }
  

  // fetchParsedData() {
  //   this.getData().then(todolists => {
  //     if(todolists) {
  //       let parsedData = JSON.parse(todolists); 
  //       return parsedData; 
  //       // debugger; 
  //     }
  //   });
  // }
  
  // findTodolist(todolistName, todolistArray) {
  //   const queriedItem = todolistArray.find(todolist => todolist.name === todolistName);
  //   return queriedItem;
  // }

  

  

}