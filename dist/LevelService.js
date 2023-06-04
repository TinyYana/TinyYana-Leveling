"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const dataFilePath = process.env.DATA_FILE_PATH || './data/memberData.json';
const memberData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
class LevelService {
    static async addExp(id, exp) {
        await this.checkMemberData(id);
        if (memberData[id]) {
            memberData[id].experience += exp;
            if (this.canLevelUp(id)) {
                await this.addLevel(id, 1);
            }
            await this.saveMemberData(memberData);
        }
    }
    static async addLevel(id, levels) {
        if (memberData[id]) {
            memberData[id].level += levels;
            await this.saveMemberData(memberData);
        }
    }
    static async addCurrency(id, amount) {
        if (memberData[id]) {
            memberData[id].currency += amount;
            await this.saveMemberData(memberData);
        }
    }
    static async spendCurrency(id, amount) {
        if (memberData[id] && memberData[id].currency >= amount) {
            memberData[id].currency -= amount;
            await this.saveMemberData(memberData);
            return true;
        }
        else {
            return false;
        }
    }
    static getCurrency(id) {
        if (memberData[id]) {
            return memberData[id].currency;
        }
        else {
            return 0;
        }
    }
    static async getLevel(id) {
        if (memberData[id]) {
            return memberData[id].level;
        }
        else {
            return 0;
        }
    }
    static async getExperience(id) {
        if (memberData[id]) {
            return memberData[id].experience;
        }
        else {
            return 0;
        }
    }
    static async setCurrency(id, amount) {
        if (memberData[id]) {
            memberData[id].currency = amount;
            await this.saveMemberData(memberData);
        }
    }
    static async checkMemberData(id) {
        if (!memberData[id]) {
            memberData[id] = {
                level: 1,
                experience: 0,
                currency: 0
            };
            await this.saveMemberData(memberData);
        }
    }
    static canLevelUp(id) {
        const currentLevel = memberData[id].level;
        const currentExp = memberData[id].experience;
        const requiredExp = Math.floor(450 * Math.pow(1.15, currentLevel - 1));
        return currentExp >= requiredExp && currentLevel < 50;
    }
    static canLevelDown(id) {
        const currentLevel = memberData[id].level;
        const currentExp = memberData[id].experience;
        const requiredExp = Math.floor(450 * Math.pow(1.15, currentLevel - 2));
        return currentExp < requiredExp && currentLevel > 1;
    }
    static async reduceExp(id, exp) {
        if (memberData[id]) {
            memberData[id].experience -= exp;
            if (this.canLevelDown(id)) {
                await this.reduceLevel(id, 1);
            }
            await this.saveMemberData(memberData);
        }
    }
    static async reduceLevel(id, levels) {
        if (memberData[id]) {
            memberData[id].level -= levels;
            if (memberData[id].level < 1) {
                memberData[id].level = 1;
            }
            await this.saveMemberData(memberData);
        }
    }
    static async saveMemberData(memberData) {
        try {
            const data = JSON.stringify(memberData, null, 2);
            fs.writeFileSync(dataFilePath, data, 'utf-8');
        }
        catch (error) {
            console.error('Error saving member data:', error);
        }
    }
}
exports.default = LevelService;
