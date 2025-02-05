import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ReaderComponent } from './reader/reader.component';

export const routes: Routes = [
    { path: '', component: AppComponent }, // Main page
    { path: 'reader', component: ReaderComponent }, // Reader page
  ];
