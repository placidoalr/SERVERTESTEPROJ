import { Get, Patch, Post, Put } from '../decorators';
import { Action } from '../kernel/action';
import { ActionType } from '../kernel/route-types';
import { VPUtils } from '../utils/vputils';
import { KernelUtils } from '../kernel/kernel-utils';
import { db } from '../server';
import { stringify } from 'querystring';
let i: any = 0;
/*Questoes[{questao,peso}]


*/

export class ProvaAction extends Action {

    private validateData() {

        if (this.req.body.quest1 != '' &&
            this.req.body.quest1 != undefined) {
            return true
        } else {
            return false
        }
    }
    private generateData(add: any) {
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
        let setDoc = db.collection('provas').doc('prova' + i).set(this.generateData(true));
        this.sendAnswer({
            token: new VPUtils().generateGUID().toUpperCase()
        });

    }

    @Get('/getProva')
    public Get() {

        let resposta = new Array<String>();
        let provas = db.collection('provas');
        let queryRef = provas.get()
            .then((snapshot: any) => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }

                snapshot.forEach((doc: any) => {
                    resposta.push(doc.data());
                });
                this.sendAnswer({
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




