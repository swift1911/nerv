import { Routes } from '@angular/router';
import { ListApp } from '../lib/app/list.app';
import { ListComponent } from '../lib/app/list.component';
import { AddComponent } from '../lib/app/add.form';
import { EditComponent } from '../lib/app/edit.form';
import { DetailComponent } from '../lib/app/detail.form';
import { CodeComponent } from '../lib/code/code.component';

export const routes: Routes = [
    {
        path: '', component: ListApp,
        children: [            
            {
                path: 'Script',
                children: [
                    { path: '', component: CodeComponent }
                ]
            },
            {
                path: ':type',
                children: [
                    {
                        path: '', component: ListComponent,
                    },
                    { path: 'add', component: AddComponent },
                    { path: ':id', component: DetailComponent },
                    { path: ':id/edit', component: EditComponent }
                ]
            },
        ]
    }
];