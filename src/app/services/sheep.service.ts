// services/sheep.service.ts
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sheep} from '../models/sheep';

@Injectable({
  providedIn: 'root'
})
export class SheepService {

  http = inject(HttpClient);

  getSheep(): Observable<Sheep[]> {
    return this.http.get<Sheep[]>('/assets/data/sheeps.json');
  }
}
