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
var RealizadaAction = /** @class */ (function (_super) {
    __extends(RealizadaAction, _super);
    function RealizadaAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RealizadaAction.prototype.generateData = function (add) {
        var id = '';
        if (add) {
            id = 'realizada' + i;
        }
        else {
            id = this.req.body.id;
        }
        var data = {
            "id": id,
            "prova": this.req.body
        };
        return data;
    };
    RealizadaAction.prototype.Post = function () {
        i += 1;
        var setDoc = server_1.db.collection('realizadas').doc('realizada' + i).set(this.generateData(true));
        console.log("falta = " + this.req.body.certa + this.req.body.q1, this.req.body.q2, this.req.body.q3, this.req.body.q4 + " iolo = " + this.req.body);
        this.sendAnswer({
            token: new vputils_1.VPUtils().generateGUID().toUpperCase()
        });
    };
    RealizadaAction.prototype.Get = function () {
        var _this = this;
        var resposta = new Array();
        var questoes = server_1.db.collection('realizadas');
        var queryRef = questoes.get()
            .then(function (snapshot) {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach(function (doc) {
                resposta.push(doc.data());
            });
            _this.sendAnswer({
                realizadas: resposta
            });
        })
            .catch(function (err) {
            console.log('Error getting documents', err);
        });
    };
    RealizadaAction.prototype.Edit = function () {
        var data = this.generateData(false);
        var setDoc = server_1.db.collection('questoes').doc(data.id).set(data);
        this.sendAnswer({
            token: new vputils_1.VPUtils().generateGUID().toUpperCase()
        });
    };
    RealizadaAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/addRealizada'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RealizadaAction.prototype, "Post", null);
    __decorate([
        decorators_1.Get('/getRealizada'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RealizadaAction.prototype, "Get", null);
    __decorate([
        decorators_1.Post('/editQuestao'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RealizadaAction.prototype, "Edit", null);
    return RealizadaAction;
}(action_1.Action));
exports.RealizadaAction = RealizadaAction;
