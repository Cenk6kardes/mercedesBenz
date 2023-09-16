import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FetchService } from 'src/app/service/loadingService/fetchTable/fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarDetail } from 'src/app/model/carDetailModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  cars: CarDetail[] = [];
  constructor(
    private _fetchTableService: FetchService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  displayedColumns: string[] = ['id', 'carID', 'instock', 'hp'];
  columns: string[] = [
    'id',
    'carID',
    'instock',
    'hp',
    'price',
    'color',
    'edit',
  ];

  ngOnInit(): void {
    this.getTableDatas();
  }

  getTableDatas(): void {
    this._fetchTableService
      .getCars()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (res: CarDetail[]) => {
          this.cars = res;
        },
        error: (error) => {
          this.snackBar.open(error.message, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
  }

  editPage(element: CarDetail): void {
    this.router.navigate(['editCar/' + element.id]);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
