import {Get, Patch, Post, Put} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {VPUtils} from '../utils/vputils';
import {KernelUtils} from '../kernel/kernel-utils';
import {db} from '../server';
import { async } from 'rxjs/internal/scheduler/async';
let i : any = 0;

let resposta = new Array<String>();

export class QuestProvaAction extends Action{

private validateData(){

    if(this.req.body.provaID != '' &&
        this.req.body.questID != '' &&
        this.req.body.peso != '' &&
        this.req.body.provaID != undefined &&
        this.req.body.questID != undefined &&
        this.req.body.peso != undefined){
            return true
    }else{
        return false
    }
}
private generateData(add:any){
    let id = '';
    if(add){
        id =  'questprova'+i;
    }else{
        id = this.req.body.id
    }
    let data = {
        id: id,
        provaID: this.req.body.provaID,
        questID: this.req.body.questID,
        peso: this.req.body.peso
    };
    return data
}


    @Post('/addQuestProva')
public Post(){
    i += 1;
    if(this.validateData()){
            
            let setDoc = db.collection('questprovas').doc('questprova'+i).set(this.generateData(true));

            console.log("falta = "+this.req.body.certa+this.req.body.q1,this.req.body.q2,this.req.body.q3,this.req.body.q4 + " iolo = "+this.req.body);
            this.sendAnswer({
                token    : new VPUtils().generateGUID().toUpperCase()
            });
    }else{
        console.log("falta = "+this.req.body.certa+this.req.body.q1,this.req.body.q2,this.req.body.q3,this.req.body.q4 + " iolo = "+this.req.body);
        this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Falta alguma coisa'));
    }
}

@Get('/getQuestProva')
public async Get(idProva : any){
    console.log(this.req.body.idProva)
let questoes = db.collection('questprovas');
let snapshot = await questoes.where('provaID', '==',this.req.body.idProva).get()

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  
  await snapshot.forEach(async (doc : any) => {
    
    let snapshot1 = await db.collection('questoes').where('id','==',doc.data().questID).get();

  if (snapshot1.empty) {
    console.log('No matching documents.');
    return;
  }
  this.sendAnswer({
    questoes    : resposta = await snap(snapshot1)
});
  async function snap(snapshot11 : any){
      const respo = new Array<any>();
      snapshot11.forEach((doc1 : any) => {
        respo.push(doc1.data());
        console.log(doc1.data());
        });
        
        return await Promise.all(respo);
  
  
  }
  });
        


}
@Patch('/delQuestProva')
public Edit(){
    if(this.validateData()){
        let data = this.generateData(false);
        let delDoc = db.collection('questoes').doc(data.id).delete();
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




