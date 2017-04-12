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
		    let item = Object.assign(new ItemModel(), data);
		    this.todolist.items.push(item); 
		    this.todolistService.saveItem(this.todolist, item);
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
				
				let index = this.todolist.items.indexOf(item);

				if ( index > -1 ) {
					this.todolistService.renameItem(this.todolist, index, data.name); 
					this.todolist.items[index].name = data.name; 
				}
			}
			}
		]
		});
 		prompt.present();
	}

	deleteItem(item): void {
	 let index = this.todolist.items.indexOf(item);
		if (index > -1 ) {
			this.todolistService.deleteItem(this.todolist, item); 
			this.todolist.items.splice(index, 1); 
		}
	}

	toggleItem(item): void {
	 let index = this.todolist.items.indexOf(item); 
	 this.todolist.items[index].checked = !item.checked;
	 this.todolistService.toggledbItem(this.todolist, index, item);
	}

	uncheckItems(): void {
	this.todolistService.uncheckDBItems(this.todolist); 

	 this.todolist.items.forEach(item => {
		  if(item.checked) {
		   item.checked = false;  
		  }
		})
	}


 

 }

  


