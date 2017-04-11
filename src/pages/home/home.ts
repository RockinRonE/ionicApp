import { Component } from '@angular/core';

import { NavController, AlertController, Platform} from 'ionic-angular';

import { TodolistModel } from '../../models/todolist.model';

import { ItemsPage } from '../items/items';
import { TodolistService } from '../../services/todolist.service'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	todolists: TodolistModel[] = [] ; 

  constructor(
  	public navCtrl: NavController,
  	private alertCtrl: AlertController, 
    private todolistService: TodolistService, 
    public platform: Platform, 
  ) { }

  ionViewDidLoad() {
    // let todolists = this.todolistService.fetchParsedData();
    // console.log(todolists, 'loaded todolists');
    // this.todolists = savedTodolists; 
   
    this.todolistService.getData().then(todolists => {
      // {"items":[{"checked":false,"name":"Item!"}],"name":"One Todolist"}
      console.log(todolists, 'getData results');

      // Object {items: Array(1), name: "One Todolist"}
      if(todolists) {
        let savedTodolists = JSON.parse(todolists);
        console.log(savedTodolists, 'parsed getData todolists');


        // [Object]
        this.todolists = savedTodolists; 
        console.log(this.todolists, "added savedTodolists"); 


      }


    });


    
  }
   
  addTodolist(): void {
  	 let prompt = this.alertCtrl.create({

        title: 'New Todo List',
        message: 'Enter the name of your new todo list:',
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
                  let todolist = Object.assign(new TodolistModel(), data);
                  this.todolists.push(todolist);
                  this.todolistService.save(this.todolists); 
                }
              
            }
        ]
    });

    prompt.present(); 
  }

  renameTodolist(todolist): void {
  	let prompt = this.alertCtrl.create({
		  title: 'Rename Todolist',
		  message: 'Enter the new name of the todolist:',
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
          let index = this.todolists.indexOf(todolist);

          if(index -1) {
            this.todolists[index].name = data.name; 
          }

          //  this.todolistService.renameTodolist(todolist, data.name); 

		    }
		 }
		]

		});

		prompt.present();
  }

  deleteTodolist(todolist): void {
  	let index = this.todolists.indexOf(todolist);

		 if(index > -1) {
		  this.todolists.splice(index, 1); 
      this.todolistService.deleteTodolist(todolist); 
		 }

  }

  viewTodolist(todolist): void {
    this.navCtrl.push(ItemsPage, {
      todolist: todolist
    });
  }























}
