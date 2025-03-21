// services/sheep.service.ts
import {inject, Injectable, resource} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sheep} from '../models/sheep';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class SheepService {

  http = inject(HttpClient);

  getSheep() {
    return httpResource<Sheep[]>( () => '/assets/data/sheeps.json', {defaultValue:[]});
  }
}
