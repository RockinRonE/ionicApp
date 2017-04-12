import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class TodolistService {

  parsedTodolists: any; 


  constructor(private storage: Storage) { 
    this.getData().then(todolists => {
      this.parsedTodolists = JSON.parse(todolists); 
    });
  }

  save(data) {
      let stringData = JSON.stringify(data); 
      console.log(stringData, 'data being saved into DB');
      this.storage.set('todolists', stringData); 
  }  


  getData(): Promise<any> {
      return this.storage.get('todolists');

  }


  renameTodolist(todolist, name) {
    let dbTodolist = this.parsedTodolists.find(post => post.name === todolist.name); 
    dbTodolist.name = name; 
    this.save(this.parsedTodolists);
  }

  deleteTodolist(todolist) {
      let index = this.parsedTodolists.findIndex(post => post.name === todolist.name); 
      this.parsedTodolists.splice(index, 1); 
      this.save(this.parsedTodolists); 
  }

  saveItem(todolist, item) {
    let index = this.parsedTodolists.findIndex(post => post.name === todolist.name); 
    this.parsedTodolists[index].items.push(item); 
    this.save(this.parsedTodolists);
      
  }

  renameItem(todolist, itemIndex, newName) {

      let dbTodolist = this.parsedTodolists.find(post => post.name === todolist.name); 
      let item = dbTodolist.items[itemIndex];
      item.name = newName; 

      this.save(this.parsedTodolists); 
      
  }

  deleteItem(todolist, item) {
    let todolistIndex = this.parsedTodolists.findIndex(post => post.name === todolist.name); 
    let itemIndex = this.parsedTodolists[todolistIndex].items.indexOf(item); 
    this.parsedTodolists[todolistIndex].items.splice(itemIndex, 1); 
    this.save(this.parsedTodolists); 
  }

  toggledbItem(todolist, itemIndex, item) {

      // find todolist in parsed todolists
      let todolistIndex = this.parsedTodolists.findIndex(post => post.name === todolist.name); 
      // is it checked?
      let isChecked = this.parsedTodolists[todolistIndex].items[itemIndex].checked;
      // set to opposite of checked status
      this.parsedTodolists[todolistIndex].items[itemIndex].checked = !isChecked; 

      this.save(this.parsedTodolists);
  }

  uncheckDBItems(todolist) {
    let todolistIndex = this.parsedTodolists.findIndex(post => post.name === todolist.name); 
    this.parsedTodolists[todolistIndex].items.forEach(item => {
      if(item.checked) {
        item.checked = false;
      }
      this.save(this.parsedTodolists); 
    })
  }
  

  

  

}