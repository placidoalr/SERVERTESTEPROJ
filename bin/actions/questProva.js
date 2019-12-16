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
var kernel_utils_1 = require("../kernel/kernel-utils");
var server_1 = require("../server");
var i = 0;
var resposta = new Array();
var QuestProvaAction = /** @class */ (function (_super) {
    __extends(QuestProvaAction, _super);
    function QuestProvaAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuestProvaAction.prototype.validateData = function () {
        if (this.req.body.provaID != '' &&
            this.req.body.questID != '' &&
            this.req.body.peso != '' &&
            this.req.body.provaID != undefined &&
            this.req.body.questID != undefined &&
            this.req.body.peso != undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    QuestProvaAction.prototype.generateData = function (add) {
        var id = '';
        if (add) {
            id = 'questprova' + i;
        }
        else {
            id = this.req.body.id;
        }
        var data = {
            id: id,
            provaID: this.req.body.provaID,
            questID: this.req.body.questID,
            peso: this.req.body.peso
        };
        return data;
    };
    QuestProvaAction.prototype.Post = function () {
        i += 1;
        if (this.validateData()) {
            var setDoc = server_1.db.collection('questprovas').doc('questprova' + i).set(this.generateData(true));
            console.log("falta = " + this.req.body.certa + this.req.body.q1, this.req.body.q2, this.req.body.q3, this.req.body.q4 + " iolo = " + this.req.body);
            this.sendAnswer({
                token: new vputils_1.VPUtils().generateGUID().toUpperCase()
            });
        }
        else {
            console.log("falta = " + this.req.body.certa + this.req.body.q1, this.req.body.q2, this.req.body.q3, this.req.body.q4 + " iolo = " + this.req.body);
            this.sendError(new kernel_utils_1.KernelUtils().createErrorApiObject(401, '1001', 'Falta alguma coisa'));
        }
    };
    QuestProvaAction.prototype.Get = function (idProva) {
        var _this = this;
        console.log(this.req.body.idProva);
        var questoes = server_1.db.collection('questprovas');
        var queryRef = questoes.where('provaID', '==', this.req.body.idProva).get()
            .then(function (snapshot) {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach(function (doc) {
                console.log(doc.data().questID);
                var queryQuests = server_1.db.collection('questoes').where('id', '==', doc.data().questID).get()
                    .promise.then(function (snapshot1) {
                    if (snapshot1.empty) {
                        console.log('No matching documents.');
                        return;
                    }
                    snapshot1.forEach(function (doc1) {
                        resposta.push(doc1.data());
                    }).then(function (resposta) {
                        console.log(resposta);
                        _this.sendAnswer({
                            questoes: resposta
                        });
                    });
                })
                    .catch(function (err) {
                    console.log('Error getting documents', err);
                });
            });
        })
            .catch(function (err) {
            console.log('Error getting documents', err);
        });
    };
    QuestProvaAction.prototype.Edit = function () {
        if (this.validateData()) {
            var data = this.generateData(false);
            var delDoc = server_1.db.collection('questoes').doc(data.id).delete();
            this.sendAnswer({
                token: new vputils_1.VPUtils().generateGUID().toUpperCase()
            });
        }
        else {
            console.log("falta = " + this.req.body.certa + this.req.body.q1, this.req.body.q2, this.req.body.q3, this.req.body.q4 + " iolo = " + this.req.body);
            this.sendError(new kernel_utils_1.KernelUtils().createErrorApiObject(401, '1001', 'Falta alguma coisa'));
        }
    };
    QuestProvaAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/addQuestProva'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], QuestProvaAction.prototype, "Post", null);
    __decorate([
        decorators_1.Get('/getQuestProva'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], QuestProvaAction.prototype, "Get", null);
    __decorate([
        decorators_1.Patch('/delQuestProva'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], QuestProvaAction.prototype, "Edit", null);
    return QuestProvaAction;
}(action_1.Action));
exports.QuestProvaAction = QuestProvaAction;
