import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { TodolistModel } from '../../models/todolist.model';
import { ItemModel } from '../../models/item.model';

import { TodolistService } from '../../services/todolist.service';


@Component({
  selector: 'items-page',
  templateUrl: 'items.html'
})
export class ItemsPage {

	todolist: TodolistModel; 

  constructor(
  	public navCtrl: NavController,
   	private navParams: NavParams,
   	private alertCtrl: AlertController,
   	private todolistService: TodolistService, 
  ) {
  	this.todolist = navParams.get('todolist');
  	// this.todolistService.todolist = this.todolist; 
  	console.log(this.todolist);
  }

  

  addItem(): void {
  	let prompt = this.alertCtrl.create({
		  title: 'Add an Item',
		  message: 'Enter the name of your item:',
		  inputs: [ 
		   {
		    name: 'name' 
		   }
		  ], 
		 	buttons: [
		  {
		   text: 'Cancel'
		  }, 
		  {
		   text: 'Save', 
		   handler: data => {
		   	console.log(data, 'item data');
		    let item = Object.assign(new ItemModel(), data);
		    console.log(item, 'item object.assign');
		    
		    this.todolist.items.push(item); 
		    this.todolistService.saveItem(this.todolist, item); 
		    console.log(this.todolist);
		    // let itemTodo = this.todolistService.getTodolist(this.todolist, item);
		   	
		   }
		  }
		]
		});

		prompt.present(); 
	}

	renameItem(item): void {
		let prompt = this.alertCtrl.create({
		  title: 'Rename This Item',
		  message: 'Enter the new name of this item:',
		  inputs: [
		   {
		    name: 'name'
		   }
		  ],
		  buttons: [
		   {
		    text: 'Cancel'
		   },
		  {
		   text: 'Save',
		   handler: data => {
		   // let index = this.todolist.items.indexOf(item);
		  }
		 }
		]
		});
 		prompt.present();
	}

	deleteItem(item): void {
	 // let index = this.todolist.items.indexOf(item);

	 
	}

	toggleItem(item): void {
	 let index = this.todolist.items.indexOf(item); 
	 this.todolist.items[index].checked = !item.checked; 
	 console.log(this.todolist, 'toggle item'); 
	 // this.todolistService.save(this.todolists); 
	}

	uncheckItems(): void {
	 this.todolist.items.forEach(item => {
		  if(item.checked) {
		   item.checked = false; 
		   // this.todolistService.save(this.todolist); 
		  }
		})
	}


 

 }

  


