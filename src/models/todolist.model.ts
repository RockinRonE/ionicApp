import { ItemModel } from './item.model'; 

export class TodolistModel {
	name: string;
	items: Array<ItemModel> = []; 
}