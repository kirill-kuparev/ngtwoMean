System.register(['angular2/core', './service/user.service', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_service_1, http_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_userService) {
                    this._userService = _userService;
                }
                AppComponent.prototype.ngOnInit = function () { this.getUsers(); };
                AppComponent.prototype.getUsers = function () {
                    var _this = this;
                    this._userService.getUsers().subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'user',
                        template: "\n\t<ul>\n\t    <li *ngFor=\"#user of users\">\n\t      {{ user.name }}\n\t    </li>\n    </ul>\n\t",
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            user_service_1.userService
                        ]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.userService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
            ;
        }
    }
});
//# sourceMappingURL=app.component.js.map