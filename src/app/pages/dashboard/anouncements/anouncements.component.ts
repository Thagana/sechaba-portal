import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  type: string;
  created_at: string;
}

@Component({
  selector: 'app-anouncements',
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIcon,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './anouncements.component.html',
  styleUrl: './anouncements.component.scss',
})
export class AnouncementsComponent implements AfterViewInit, OnInit {
  public announcements: Announcement[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'body',
    'type',
    'created_at',
    'actions'
  ];
  dataSource = new MatTableDataSource<Announcement>(this.announcements);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: DashboardService,
    private readonly snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAnnouncements();
  }
  async getAnnouncements() {
    try {
      const response = await this.service.getAnnouncements();
      this.announcements = response;
      this.dataSource = new MatTableDataSource<Announcement>(this.announcements); // Create a new data source instance
      this.dataSource.paginator = this.paginator; // Reattach the paginator
    } catch (error) {
      console.error(error);
      this.snackbar.open(error as string);
    }
  }
  async handleAddAnnouncement() {
    try {
      this.router.navigate(['dashboard', 'announcements', 'create'])
    } catch (error) {
      console.error(error);
      this.snackbar.open(error as string);
    }
  }
  async handleDelete(id : string) {
    try {
      // const response = await this.service.deleteAnnouncement(id)
    } catch (error) {
      console.error(error);
      this.snackbar.open(error as string);
    }
  }
}