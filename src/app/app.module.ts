import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ItemsPage } from '../pages/items/items';
import { PluralItem } from '../pipes/plural-item';

import { TodolistService } from '../services/todolist.service'; 
import { IonicStorageModule } from '@ionic/storage';
import { ItemService } from '../services/item.service'; 


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemsPage,
    PluralItem,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodolistService,
    ItemService, 
  ]
})
export class AppModule {}
