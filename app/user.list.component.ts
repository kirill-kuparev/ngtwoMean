import {Component} from 'angular2/core'
import {userService} from './service/user.service'
import {User} from './service/models/user'

@Component({
	selector: 'user-list',
	template: `
	<ul>
		<li *ngFor="#user of users">
		{{ user.name }} <button name="{{ user._id }}">Edit</button>
		</li>
	</ul>
	`
})

export class UserListComponent{ 
	constructor (private _userService: userService) {
		this._userService.users$.subscribe(updatedUsers => { this.users = updatedUsers });
	}

	ngOnInit() {
		this._userService.getUsers();
	}

	users: Array<User>;
};