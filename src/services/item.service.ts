import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { TodolistService } from './todolist.service';

@Injectable()
export class ItemService {
	constructor(
		private storage: Storage, 
		private todolistService: TodolistService,
		) {}

	saveItem(todolist, item) {
    this.todolistService.getData().then(todolists => {
     let parsedTodolists = JSON.parse(todolists);

      let index = parsedTodolists.findIndex(post => post.name === todolist.name); 
      parsedTodolists[index].items.push(item); 
      this.todolistService.save(parsedTodolists); 
      
    })
  }






}