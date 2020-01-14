"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../decorators");
var action_1 = require("../kernel/action");
var route_types_1 = require("../kernel/route-types");
var vputils_1 = require("../utils/vputils");
var server_1 = require("../server");
var i = 0;
/*Questoes[{questao,peso}]


*/
var ProvaAction = /** @class */ (function (_super) {
    __extends(ProvaAction, _super);
    function ProvaAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProvaAction.prototype.validateData = function () {
        if (this.req.body.quest1 != '' &&
            this.req.body.quest1 != undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    ProvaAction.prototype.generateData = function (add) {
        var id = '';
        var data = {};
        if (add) {
            id = 'prova' + i;
            data = {
                id: id,
                prova: this.req.body
            };
        }
        else {
            data = {
                id: this.req.body.id,
                prova: this.req.body
            };
        }
        return data;
    };
    ProvaAction.prototype.Post = function () {
        i += 1;
        // if(this.validateData()){ 
        var setDoc = server_1.db.collection('provas').doc('prova' + i).set(this.generateData(true));
        this.sendAnswer({
            token: new vputils_1.VPUtils().generateGUID().toUpperCase()
        });
        // }else{
        //     this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Falta alguma coisa'));
        // }
    };
    ProvaAction.prototype.Get = function () {
        var _this = this;
        var resposta = new Array();
        var provas = server_1.db.collection('provas');
        var queryRef = provas.get()
            .then(function (snapshot) {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach(function (doc) {
                resposta.push(doc.data());
            });
            _this.sendAnswer({
                resposta: resposta
            });
        })
            .catch(function (err) {
            console.log('Error getting documents', err);
        });
    }; /*
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
    ProvaAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/addProva'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProvaAction.prototype, "Post", null);
    __decorate([
        decorators_1.Get('/getProva'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProvaAction.prototype, "Get", null);
    return ProvaAction;
}(action_1.Action));
exports.ProvaAction = ProvaAction;
