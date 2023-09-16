import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './component/table/table.component';
import { EditCarComponent } from './component/edit-car/edit-car.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'editCar/:id', component: EditCarComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
