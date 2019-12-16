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
var QuestaoAction = /** @class */ (function (_super) {
    __extends(QuestaoAction, _super);
    function QuestaoAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuestaoAction.prototype.validateData = function () {
        if (this.req.body.ask != '' &&
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
            this.req.body.certa != undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    QuestaoAction.prototype.generateData = function (add) {
        var id = '';
        if (add) {
            id = 'questao' + i;
        }
        else {
            id = this.req.body.id;
        }
        var data = {
            id: id,
            ask: this.req.body.ask,
            opt1: this.req.body.q1,
            opt2: this.req.body.q2,
            opt3: this.req.body.q3,
            opt4: this.req.body.q4,
            certa: this.req.body.certa
        };
        return data;
    };
    QuestaoAction.prototype.Post = function () {
        i += 1;
        if (this.validateData()) {
            var setDoc = server_1.db.collection('questoes').doc('questao' + i).set(this.generateData(true));
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
    QuestaoAction.prototype.Get = function () {
        var _this = this;
        var resposta = [''];
        var questoes = server_1.db.collection('questoes');
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
                questoes: resposta
            });
        })
            .catch(function (err) {
            console.log('Error getting documents', err);
        });
    };
    QuestaoAction.prototype.Edit = function () {
        if (this.validateData()) {
            var data = this.generateData(false);
            var setDoc = server_1.db.collection('questoes').doc(data.id).set(data);
            this.sendAnswer({
                token: new vputils_1.VPUtils().generateGUID().toUpperCase()
            });
        }
        else {
            console.log("falta = " + this.req.body.certa + this.req.body.q1, this.req.body.q2, this.req.body.q3, this.req.body.q4 + " iolo = " + this.req.body);
            this.sendError(new kernel_utils_1.KernelUtils().createErrorApiObject(401, '1001', 'Falta alguma coisa'));
        }
    };
    QuestaoAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/addQuestao'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], QuestaoAction.prototype, "Post", null);
    __decorate([
        decorators_1.Get('/getQuestao'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], QuestaoAction.prototype, "Get", null);
    __decorate([
        decorators_1.Post('/editQuestao'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], QuestaoAction.prototype, "Edit", null);
    return QuestaoAction;
}(action_1.Action));
exports.QuestaoAction = QuestaoAction;
