import { Component, Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-employment-status-chip',
  imports: [MatChipsModule],
  templateUrl: './employment-status-chip.component.html',
  styleUrl: './employment-status-chip.component.scss'
})
export class EmploymentStatusChipComponent {
  @Input() status!: string;
}
