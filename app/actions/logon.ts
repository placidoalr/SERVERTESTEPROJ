import {Post} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {VPUtils} from '../utils/vputils';

export class LogonAction extends Action{

   

    @Post('/logon')
    public Post(){

        if(this.req.body.userName == 'admin' && this.req.body.password == 'teste@123')
            this.sendAnswer({
                token    : new VPUtils().generateGUID().toUpperCase()
            });
        else{
            console.log('Usuário ou senha incorretos');
        }
    }

    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}