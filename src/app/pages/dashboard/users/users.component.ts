import {MatCardModule} from '@angular/material/card';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {EmploymentStatusChipComponent} from './components/employment-status-chip/employment-status-chip.component';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, EmploymentStatusChipComponent, MatIcon, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'age', "village", 'employmentStatus', 'dateJoined', 'view'];
  dataSource = new MatTableDataSource<User>(Users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface User {
  id: string;
  name: string;
  surname: string;
  age: number;
  village: string;
  employmentStatus: string;
  dateJoined: string;
}

const Users: User[] = [
  {
    id: "1",
    name: 'Samuel',
    surname: "Mothwa",
    age: 28,
    village: "Mmalepetleke",
    employmentStatus: 'EMPLOYED',
    dateJoined: '2021-03-01T00:00:00.000Z',
  },
  {
    id: "2",
    name: 'Thabo',
    surname: "Mokoena",
    age: 32,
    village: "Ga-Rankuwa",
    employmentStatus: 'UNEMPLOYED',
    dateJoined: '2019-07-15T00:00:00.000Z',
  },
  {
    id: "3",
    name: 'Naledi',
    surname: "Mahlangu",
    age: 24,
    village: "Lebowakgomo",
    employmentStatus: 'EMPLOYED',
    dateJoined: '2022-05-20T00:00:00.000Z',
  },
  {
    id: "4",
    name: 'Kagiso',
    surname: "Dlamini",
    age: 41,
    village: "Hammanskraal",
    employmentStatus: 'SELF-EMPLOYED',
    dateJoined: '2018-11-11T00:00:00.000Z',
  },
  {
    id: "5",
    name: 'Refilwe',
    surname: "Nkosi",
    age: 29,
    village: "Soshanguve",
    employmentStatus: 'EMPLOYED',
    dateJoined: '2020-09-05T00:00:00.000Z',
  },
  {
    id: "6",
    name: 'Sipho',
    surname: "Zulu",
    age: 35,
    village: "Umlazi",
    employmentStatus: 'UNEMPLOYED',
    dateJoined: '2017-12-30T00:00:00.000Z',
  },
  {
    id: "7",
    name: 'Lesego',
    surname: "Modise",
    age: 27,
    village: "Mogwase",
    employmentStatus: 'EMPLOYED',
    dateJoined: '2023-02-14T00:00:00.000Z',
  },
  {
    id: "8",
    name: 'Bongani',
    surname: "Ngcobo",
    age: 31,
    village: "Mthatha",
    employmentStatus: 'SELF-EMPLOYED',
    dateJoined: '2016-08-10T00:00:00.000Z',
  },
  {
    id: "9",
    name: 'Palesa',
    surname: "Sebeko",
    age: 26,
    village: "Rustenburg",
    employmentStatus: 'EMPLOYED',
    dateJoined: '2021-06-22T00:00:00.000Z',
  },
  {
    id: "10",
    name: 'Mandla',
    surname: "Khanyile",
    age: 38,
    village: "Welkom",
    employmentStatus: 'UNEMPLOYED',
    dateJoined: '2015-04-18T00:00:00.000Z',
  },
  {
    id: "11",
    name: 'Zanele',
    surname: "Buthelezi",
    age: 30,
    village: "Mbombela",
    employmentStatus: 'EMPLOYED',
    dateJoined: '2019-03-29T00:00:00.000Z',
  },
  {
    id: "12",
    name: 'Sibusiso',
    surname: "Mthembu",
    age: 25,
    village: "Vanderbijlpark",
    employmentStatus: 'UNEMPLOYED',
    dateJoined: '2022-10-08T00:00:00.000Z',
  },
  {
    id: "13",
    name: 'Dineo',
    surname: "Radebe",
    age: 28,
    village: "Polokwane",
    employmentStatus: 'SELF-EMPLOYED',
    dateJoined: '2017-07-21T00:00:00.000Z',
  },
  {
    id: "14",
    name: 'Tshepo',
    surname: "Mabaso",
    age: 34,
    village: "Tembisa",
    employmentStatus: 'EMPLOYED',
    dateJoined: '2020-01-12T00:00:00.000Z',
  },
  {
    id: "15",
    name: 'Ntsako',
    surname: "Baloyi",
    age: 23,
    village: "Giyani",
    employmentStatus: 'UNEMPLOYED',
    dateJoined: '2023-09-01T00:00:00.000Z',
  },
  {
    id: "16",
    name: 'Lerato',
    surname: "Molefe",
    age: 29,
    village: "Katlehong",
    employmentStatus: 'EMPLOYED',
    dateJoined: '2018-05-09T00:00:00.000Z',
  },
  {
    id: "17",
    name: 'Jabu',
    surname: "Shongwe",
    age: 37,
    village: "Pietermaritzburg",
    employmentStatus: 'SELF-EMPLOYED',
    dateJoined: '2016-02-25T00:00:00.000Z',
  },
  {
    id: "18",
    name: 'Bonolo',
    surname: "Morake",
    age: 24,
    village: "Mafikeng",
    employmentStatus: 'UNEMPLOYED',
    dateJoined: '2022-07-19T00:00:00.000Z',
  },
  {
    id: "19",
    name: 'Andile',
    surname: "Sithole",
    age: 33,
    village: "Durban",
    employmentStatus: 'EMPLOYED',
    dateJoined: '2015-11-04T00:00:00.000Z',
  },
  {
    id: "20",
    name: 'Nomvula',
    surname: "Phiri",
    age: 40,
    village: "Bloemfontein",
    employmentStatus: 'SELF-EMPLOYED',
    dateJoined: '2014-06-30T00:00:00.000Z',
  },
];
