import {Get, Patch, Post, Put} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {VPUtils} from '../utils/vputils';
import {KernelUtils} from '../kernel/kernel-utils';
import {db} from '../server';
let i : any = 0;


export class QuestaoAction extends Action{

private validateData(){

    if(this.req.body.ask != '' &&
        this.req.body.q1 != '' &&
        this.req.body.q2 != '' &&
        this.req.body.q3 != '' &&
        this.req.body.q4 != '' &&
        this.req.body.certa != '' &&
        this.req.body.ask != undefined &&
        this.req.body.q1 != undefined &&
        this.req.body.q2 != undefined &&
        this.req.body.q3 != undefined &&
        this.req.body.q4 != undefined &&
        this.req.body.certa != undefined){
            return true
    }else{
        return false
    }
}
private generateData(add:any){
    let id = '';
    if(add){
        id =  'questao'+i;
    }else{
        id = this.req.body.id
    }
    let data = {
        id: id,
        ask: this.req.body.ask,
        opt1: this.req.body.q1,
        opt2: this.req.body.q2,
        opt3: this.req.body.q3,
        opt4: this.req.body.q4,
        certa: this.req.body.certa
    };
    return data
}


    @Post('/addQuestao')
public Post(){
    i += 1;
    if(this.validateData()){
            
            let setDoc = db.collection('questoes').doc('questao'+i).set(this.generateData(true));

            console.log("falta = "+this.req.body.certa+this.req.body.q1,this.req.body.q2,this.req.body.q3,this.req.body.q4 + " iolo = "+this.req.body);
            this.sendAnswer({
                token    : new VPUtils().generateGUID().toUpperCase()
            });
    }else{
        console.log("falta = "+this.req.body.certa+this.req.body.q1,this.req.body.q2,this.req.body.q3,this.req.body.q4 + " iolo = "+this.req.body);
        this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Falta alguma coisa'));
    }
}

@Get('/getQuestao')
public Get(){
    
let resposta = [''];
let questoes = db.collection('questoes');
let queryRef = questoes.get()
.then((snapshot : any) => {
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  
  snapshot.forEach((doc : any) => {
    resposta.push(doc.data());
  });
  this.sendAnswer({
    questoes    : resposta
});
})
.catch((err : any) => {
  console.log('Error getting documents', err);
});
}
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
   
}
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}




