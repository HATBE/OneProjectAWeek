import { Component } from '@angular/core';
import { MotorcycleListItemComponent } from '../motorcycle-list-item/motorcycle-list-item.component';
import { MotorcycleService } from '../../services/motorcycle.service';
import { Motorcycle } from '../../models/motorcycle.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-motorcycle-list',
  standalone: true,
  imports: [MotorcycleListItemComponent, CommonModule, RouterModule],
  templateUrl: './motorcycle-list.component.html',
  styleUrl: './motorcycle-list.component.css',
})
export class MotorcycleListComponent {
  constructor(protected motorcycleService: MotorcycleService) {}

  protected motorcycles: Motorcycle[] = [];

  public async ngOnInit() {
    this.updateList();
  }

  protected updateList() {
    this.motorcycles = this.motorcycleService.getAll();
  }
}
