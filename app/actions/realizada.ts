import { Get, Patch, Post, Put } from '../decorators';
import { Action } from '../kernel/action';
import { ActionType } from '../kernel/route-types';
import { VPUtils } from '../utils/vputils';
import { KernelUtils } from '../kernel/kernel-utils';
import { db } from '../server';
let i: any = 0;


export class RealizadaAction extends Action {

    private generateData(add: any) {//cria um json para enviar para o database
        let id = '';
        if (add) {
            id = 'realizada' + i;
        } else {
            id = this.req.body.id
        }
        let data = {
            "id": id,
            "prova": this.req.body
        };
        return data
    }


    @Post('/addRealizada')
    public Post() {
        i += 1;
        //envia o json para o doc realizada da collection realizadas
        let setDoc = db.collection('realizadas').doc('realizada' + i).set(this.generateData(true));
        this.sendAnswer({
            token: new VPUtils().generateGUID().toUpperCase()
        });
    }

    @Get('/getRealizada')
    public Get() {

        let resposta = new Array<String>();
        let realizada = db.collection('realizadas');
        let queryRef = realizada.get()//get das provas realizadas no banco de dados
            .then((snapshot: any) => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }

                snapshot.forEach((doc: any) => {//foreach inserindo os dados na resposta
                    resposta.push(doc.data());
                });
                this.sendAnswer({//retorna a resposta para o provider do frontEnd
                    realizadas: resposta
                });
            })
            .catch((err: any) => {
                console.log('Error getting documents', err);
            });
    }
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}




