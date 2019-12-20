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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        return __awaiter(this, void 0, void 0, function () {
            var questoes, snapshot;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.req.body.idProva);
                        questoes = server_1.db.collection('questprovas');
                        return [4 /*yield*/, questoes.where('provaID', '==', this.req.body.idProva).get()];
                    case 1:
                        snapshot = _a.sent();
                        if (snapshot.empty) {
                            console.log('No matching documents.');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, snapshot.forEach(function (doc) { return __awaiter(_this, void 0, void 0, function () {
                                function snap(snapshot11) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var respo;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    respo = new Array();
                                                    snapshot11.forEach(function (doc1) {
                                                        respo.push(doc1.data());
                                                        console.log(doc1.data());
                                                    });
                                                    return [4 /*yield*/, Promise.all(respo)];
                                                case 1: return [2 /*return*/, _a.sent()];
                                            }
                                        });
                                    });
                                }
                                var snapshot1, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, server_1.db.collection('questoes').where('id', '==', doc.data().questID).get()];
                                        case 1:
                                            snapshot1 = _c.sent();
                                            if (snapshot1.empty) {
                                                console.log('No matching documents.');
                                                return [2 /*return*/];
                                            }
                                            _a = this.sendAnswer;
                                            _b = {};
                                            return [4 /*yield*/, snap(snapshot1)];
                                        case 2:
                                            _a.apply(this, [(_b.questoes = resposta = _c.sent(),
                                                    _b)]);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
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
        __metadata("design:returntype", Promise)
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
