import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.getAll();

  filterPhrase: string = '';
  filterKey: string = 'name';

  sortby: string = 'id';
  sorterDirection: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.getAll()
  }

  onDelete(user: User): void {
    this.userService.remove(user).subscribe(
      () => {
        this.userService.getAll();
      }
    );
  }

  changeOrder(param: string): void {
    if (this.sortby === '' || this.sortby != param) {
      this.sorterDirection = 1;
    }
    if (this.sortby === param) {
      if (this.sorterDirection === 1) this.sorterDirection = 2;
      else this.sorterDirection = 1;
    }
    this.sortby = param;
  }


  }

