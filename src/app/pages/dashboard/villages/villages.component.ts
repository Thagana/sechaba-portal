import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {
  MatTableDataSource, MatTableModule
} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-villages',
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, MatIcon, RouterLink],
  templateUrl: './villages.component.html',
  styleUrl: './villages.component.scss'
})
export class VillagesComponent implements AfterViewInit {
  public displayedColumns: string[] = ['id', 'name', 'leadership', 'users', 'view'];
  public dataSource = new MatTableDataSource<Village>(Villages);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Village {
  id: string;
  name: string;
  leadership: string;
  users: number;
}

const Villages: Village[] = [
  {
    id: '1',
    name: "Mmalepetleke",
    leadership: "Jan Lekalakala",
    users: 10020
  }
]
