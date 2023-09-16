import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetail } from 'src/app/model/carDetailModel';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor(private http: HttpClient) {}

  convertID(id: number): number {
    return --id;
  }

  getCars(): Observable<CarDetail[]> {
    return this.http.get<CarDetail[]>(
      'https://mb-table-547a5-default-rtdb.europe-west1.firebasedatabase.app/datas.json'
    );
  }

  getCar(id: number): Observable<CarDetail> {
    const dataBaseId = this.convertID(id);
    return this.http.get<CarDetail>(
      `https://mb-table-547a5-default-rtdb.europe-west1.firebasedatabase.app/datas/${dataBaseId}.json`
    );
  }

  getColors(): Observable<Array<string>> {
    return this.http.get<Array<string>>(
      `https://mb-table-547a5-default-rtdb.europe-west1.firebasedatabase.app/colors.json`
    );
  }

  updateCar(id: number, carDetails: CarDetail): Observable<CarDetail> {
    const dataBaseId = this.convertID(id);
    return this.http.put<CarDetail>(
      `https://mb-table-547a5-default-rtdb.europe-west1.firebasedatabase.app/datas/${dataBaseId}.json`,
      carDetails
    );
  }
}
