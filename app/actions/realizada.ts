import {Get, Patch, Post, Put} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {VPUtils} from '../utils/vputils';
import {KernelUtils} from '../kernel/kernel-utils';
import {db} from '../server';
let i : any = 0;


export class RealizadaAction extends Action{

private generateData(add:any){
    let id = '';
    if(add){
        id =  'realizada'+i;
    }else{
        id = this.req.body.id
    }
    let data = {
        "id" : id,
        "prova" : this.req.body
    };
    return data
}


    @Post('/addRealizada')
public Post(){
    i += 1;
            
            let setDoc = db.collection('realizadas').doc('realizada'+i).set(this.generateData(true));

            console.log("falta = "+this.req.body.certa+this.req.body.q1,this.req.body.q2,this.req.body.q3,this.req.body.q4 + " iolo = "+this.req.body);
            this.sendAnswer({
                token    : new VPUtils().generateGUID().toUpperCase()
            });
}

@Get('/getRealizada')
public Get(){
    
let resposta = [''];
let questoes = db.collection('realizadas');
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
    realizadas    : resposta
});
})
.catch((err : any) => {
  console.log('Error getting documents', err);
});
}
@Post('/editQuestao')
public Edit(){
        let data = this.generateData(false);
        let setDoc = db.collection('questoes').doc(data.id).set(data);
        this.sendAnswer({
            token    : new VPUtils().generateGUID().toUpperCase()
        });
   
   
}
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}




