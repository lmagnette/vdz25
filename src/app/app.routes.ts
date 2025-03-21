import { Routes } from '@angular/router';
import {SheepsComponent} from './components/sheeps/sheeps.component';
import {ChangeDetectionComponent} from './change-detection/change-detection.component';

export const routes: Routes = [
  {
    path: '',
    component: SheepsComponent
  },
  {
    path:'change',
    loadComponent:() => ChangeDetectionComponent,
  },
];
