import {Get, Patch, Post, Put} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {VPUtils} from '../utils/vputils';
import {KernelUtils} from '../kernel/kernel-utils';
import {db} from '../server';
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
public Get(idProva : any){
    console.log(this.req.body.idProva)
let questoes = db.collection('questprovas');
let queryRef = questoes.where('provaID', '==',this.req.body.idProva).get()
.then((snapshot : any) => {
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  
  snapshot.forEach((doc : any) => {
      console.log(doc.data().questID)
 let queryQuests = db.collection('questoes').where('id','==',doc.data().questID).get()
.promise.then((snapshot1 : any) => {
  if (snapshot1.empty) {
    console.log('No matching documents.');
    return;
  }
  
   snapshot1.forEach((doc1 : any) => {
    resposta.push(doc1.data());
    
  }).then( 
      (resposta : any) =>{
        console.log(resposta)
        this.sendAnswer({
          questoes : resposta
        });
      }
  )
  

})
.catch((err : any) => {
  console.log('Error getting documents', err);
});
  });
  
})
.catch((err : any) => {
  console.log('Error getting documents', err);
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




