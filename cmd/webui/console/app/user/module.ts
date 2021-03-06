import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Form } from '../lib/form/model';
import { FormConfig } from '../lib/config/form.config';
import { FormRegistry } from '../lib/form/form.registry';
import { AppModule } from '../lib/app/module';
import { routes } from '../lib/app/routes';

const form: Form = {
    name: "user_form",
    fields: [
        {
            name: "Name", label: "用户名", control: "text", type: "string", validators: { 'required': { message: '不能为空' } }
        },
        {
            name: "Nick", label: "昵称", control: "text", type: "string", validators: { 'required': { message: '不能为空' } }
        },
        { name: "Mail", label: "邮件", control: "email", type: "string" },
        { name: "Phone", label: "电话", control: "text", type: "long" },
        { name: "Password", label: "密码", control: "password", type: "string" }
    ]
};

@NgModule({
    imports: [
        AppModule,
        RouterModule.forChild(routes)
    ]
})
export class UserModule {

    constructor(
        formRegistry: FormRegistry,
        configService: FormConfig
    ) {
        formRegistry.put('user.account.add', form);
        formRegistry.put('user.account.edit', form);
        formRegistry.put('user.account.detail', form);

        configService.put('user',
            {
                title: '用户',
                menus: [
                    {
                        name: "人员管理",
                        url: "/user/Account"
                    }
                ],
                Account: {
                    list: {
                        title: '人员列表', columns: [
                            { label: '用户名', name: 'Name' },
                            { label: '昵称', name: 'Nick' },
                            { label: '邮件', name: 'Mail' },
                            { label: '电话', name: 'Phone' },
                            { label: '操作' }
                        ]
                    },
                    add: { title: '添加人员', form: 'user.account.add' },
                    edit: { title: '编辑人员', form: 'user.account.edit' },
                    detail: { title: '查看人员', form: 'user.account.detail' }
                }
            });
    }
}
