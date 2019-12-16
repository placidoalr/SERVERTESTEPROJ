import {Get, Patch, Post, Put} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {VPUtils} from '../utils/vputils';
import {KernelUtils} from '../kernel/kernel-utils';
import {db} from '../server';
import { stringify } from 'querystring';
let i : any = 0;
/*Questoes[{questao,peso}]


*/

export class ProvaAction extends Action{

private validateData(){

    if(this.req.body.quest1 != '' &&
        this.req.body.quest1 != undefined){
            return true
    }else{
        return false
    }
}
private generateData(add:any){
    let id = '';
    console.log("5")
    if(add){
        id =  'prova'+i;
    }else{
        id = this.req.body.id
    }
    let data = {
        id: id
    };
    
    return data
}


    @Post('/addProva')
public Post(){
    i += 1;
    // if(this.validateData()){ 
            let setDoc = db.collection('provas').doc('prova'+i).set(this.generateData(true));
            this.sendAnswer({
                token    : new VPUtils().generateGUID().toUpperCase()
            });
    // }else{
    //     this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Falta alguma coisa'));
    // }
}

@Get('/getProva')
public Get(){
    
let resposta = [''];
let provas = db.collection('provas');
let queryRef = provas.get()
.then((snapshot : any) => {
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  
  snapshot.forEach((doc : any) => {
    resposta.push(doc.data());
  });
  this.sendAnswer({
    provas    : resposta
});
})
.catch((err : any) => {
  console.log('Error getting documents', err);
});
}/*
@Post('/editQuestao')
public Edit(){
    if(this.validateData()){
        let data = this.generateData(false);
        let setDoc = db.collection('questoes').doc(data.id).set(data);
        this.sendAnswer({
            token    : new VPUtils().generateGUID().toUpperCase()
        });
    }else{
        console.log("falta = "+this.req.body.certa+this.req.body.q1,this.req.body.q2,this.req.body.q3,this.req.body.q4 + " iolo = "+this.req.body);
        this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Falta alguma coisa'));
    }
   
}*/
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}




