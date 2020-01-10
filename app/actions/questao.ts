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
        this.req.body.r1 != '' &&
        this.req.body.r2 != '' &&
        this.req.body.r3 != '' &&
        this.req.body.r4 != '' &&
        this.req.body.certa != '' &&
        this.req.body.ask != undefined &&
        this.req.body.r1 != undefined &&
        this.req.body.r2 != undefined &&
        this.req.body.r3 != undefined &&
        this.req.body.r4 != undefined &&
        this.req.body.certa != undefined){

            console.log("asdfasfas")
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
        r1: this.req.body.r1,
        r2: this.req.body.r2,
        r3: this.req.body.r3,
        r4: this.req.body.r4,
        certa: this.req.body.certa
    };
    return data
}


    @Post('/addQuestao')
public Post(){
    i += 1;
    if(this.validateData()){
            
            let setDoc = db.collection('questoes').doc('questao'+i).set(this.generateData(true));

            console.log("falta = "+this.req.body.certa+this.req.body.r1,this.req.body.r2,this.req.body.r3,this.req.body.r4 + " iolo = "+this.req.body);
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
    
let resposta = new Array<String>();
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
    resposta
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




