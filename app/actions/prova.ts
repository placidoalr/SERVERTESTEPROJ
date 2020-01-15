import { Get, Patch, Post, Put } from '../decorators';
import { Action } from '../kernel/action';
import { ActionType } from '../kernel/route-types';
import { VPUtils } from '../utils/vputils';
import { KernelUtils } from '../kernel/kernel-utils';
import { db } from '../server';
import { stringify } from 'querystring';
let i: any = 0;
export class ProvaAction extends Action {

    private generateData(add: any) {//gera o json que será enviado para o banco
        let id = '';
        let data = {};
        if (add) {
            id = 'prova' + i;
            data = {
                id: id,
                prova: this.req.body
            };
        } else {
            data = {
                id: this.req.body.id,
                prova: this.req.body
            };
        }

        return data
    }


    @Post('/addProva')
    public Post() {
        i += 1;
        //envia o json para o doc prova da collection provas
        let setDoc = db.collection('provas').doc('prova' + i).set(this.generateData(true));
        this.sendAnswer({
            token: new VPUtils().generateGUID().toUpperCase()
        });

    }

    @Get('/getProva')
    public Get() {

        let resposta = new Array<String>();
        let provas = db.collection('provas');
        let queryRef = provas.get()//get das provas no banco de dados
            .then((snapshot: any) => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }

                snapshot.forEach((doc: any) => {//foreach inserindo os dados na resposta
                    resposta.push(doc.data());
                });
                this.sendAnswer({//retorna a resposta para o provider do frontEnd
                    resposta
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




