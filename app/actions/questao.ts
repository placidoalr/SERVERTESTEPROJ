import { Get, Patch, Post, Put } from '../decorators';
import { Action } from '../kernel/action';
import { ActionType } from '../kernel/route-types';
import { VPUtils } from '../utils/vputils';
import { KernelUtils } from '../kernel/kernel-utils';
import { db } from '../server';
let i: any = 0;


export class QuestaoAction extends Action {

    private validateData() { //Verifica se chegou todos os dados necessários
        if (this.req.body.ask != '' &&
            this.req.body.a != '' &&
            this.req.body.b != '' &&
            this.req.body.c != '' &&
            this.req.body.d != '' &&
            this.req.body.certa != '' &&
            this.req.body.ask != undefined &&
            this.req.body.a != undefined &&
            this.req.body.b != undefined &&
            this.req.body.c != undefined &&
            this.req.body.d != undefined &&
            this.req.body.certa != undefined) {
            return true
        } else {
            return false
        }
    }
    private generateData(add: any) {//gera o json que será enviado para o banco
        let id = '';
        if (add) {
            id = 'questao' + i;
        } else {
            id = this.req.body.id
        }
        let data = {
            id: id,
            ask: this.req.body.ask,
            a: this.req.body.a,
            b: this.req.body.b,
            c: this.req.body.c,
            d: this.req.body.d,
            certa: this.req.body.certa
        };
        return data
    }


    @Post('/addQuestao')
    public Post() {
        i += 1;
        //após validar se tem todos os dados ele insere os mesmos no documento questao da collection questoes
        if (this.validateData()) {
            let setDoc = db.collection('questoes').doc('questao' + i).set(this.generateData(true));
            this.sendAnswer({
                token: new VPUtils().generateGUID().toUpperCase()
            });
        } else {
            this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Falta alguma coisa'));
        }
    }

    @Get('/getQuestao')
    public Get() {

        let resposta = new Array<String>();
        let questoes = db.collection('questoes');
        let queryRef = questoes.get()//Select de todas as questões
            .then((snapshot: any) => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }

                snapshot.forEach((doc: any) => {//foreach inserindo os dados pesquisados na resposta
                    resposta.push(doc.data());
                });
                this.sendAnswer({
                    resposta //retornando a resposta
                });
            })
            .catch((err: any) => {
                console.log('Error getting documents', err);
            });
    }

    @Post('/editQuestao')
    public Edit() {
        if (this.validateData()) {//valida os dados e após isso gera a data com false para exemplificar que o id já existe e não deve ser criado um novo
            let data = this.generateData(false);
            let setDoc = db.collection('questoes').doc(data.id).set(data);//salva a data no documento que possui o mesmo nome da data.id na collection de questoes
            this.sendAnswer({
                token: new VPUtils().generateGUID().toUpperCase()
            });
        } else {
            this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Falta alguma coisa'));
        }

    }
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}




