import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserApp } from './app';
import { RoleComponent } from './role';

const routes: Routes = [
    {
        path: '', component: UserApp,
        children: [
            { path: '', redirectTo: "role", pathMatch: "prefix" },
            { path: 'project', component: UserApp },
            { path: 'account', component: UserApp },
            { path: 'role', component: RoleComponent }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule,
        UserApp
    ],
    declarations: [
        UserApp,
        RoleComponent
    ],
})
export class UserModule { }
