import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CarDetail } from 'src/app/model/carDetailModel';
import { FetchService } from 'src/app/service/loadingService/fetchTable/fetch.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss'],
})
export class EditCarComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  private id!: number;
  public carDetails!: CarDetail;
  public colorOptions$!: Observable<string[]>;
  form!: FormGroup;
  isFormChanged = false;

  constructor(
    private route: ActivatedRoute,
    private _fetchService: FetchService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    route.params.subscribe((param) => {
      this.id = param['id'];
    });
    this.colorOptions$ = this._fetchService.getColors();
    this.form = this.formBuilder.group({
      id: [''],
      carID: [''],
      instock: [
        null,
        [Validators.required, Validators.max(550), Validators.min(100)],
      ],
      hp: [null, Validators.required],
      price: [0, Validators.required],
      color: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCarDetails();
    this.form.valueChanges.subscribe((value) => {
      this.isFormChanged = true;
    });
  }

  getCarDetails(): void {
    this._fetchService
      .getCar(this.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (res: CarDetail) => {
          this.form.patchValue(res);
          this.form.get('id')?.disable();
          this.form.get('carID')?.disable();
          this.isFormChanged = false;
        },
        error: (error) => {
          this.snackBar.open(error.message, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }

  onSubmit(): void {
    if (this.form.valid && this.isFormChanged) {
      const carDetails = this.form.getRawValue();

      this._fetchService.updateCar(this.id, carDetails).subscribe({
        next: (res: CarDetail) => {
          this.snackBar.open('Successfully Edited', 'Close', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.snackBar.open(error.message, 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
