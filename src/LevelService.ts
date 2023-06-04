import Member from './Member';
import * as fs from 'fs';

const dataFilePath = process.env.DATA_FILE_PATH || './data/memberData.json';
const memberData: Member = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

class LevelService {
    static async addExp(id: string, exp: number): Promise<void> {
        await this.checkMemberData(id);
        if (memberData[id]) {
            memberData[id].experience += exp;
            if (this.canLevelUp(id)) {
                await this.addLevel(id, 1);
            }
            await this.saveMemberData(memberData);
        }
    }

    static async addLevel(id: string, levels: number): Promise<void> {
        if (memberData[id]) {
            memberData[id].level += levels;
            await this.saveMemberData(memberData);
        }
    }

    static async addCurrency(id: string, amount: number): Promise<void> {
        if (memberData[id]) {
            memberData[id].currency += amount;
            await this.saveMemberData(memberData);
        }
    }

    static async spendCurrency(id: string, amount: number): Promise<boolean> {
        if (memberData[id] && memberData[id].currency >= amount) {
            memberData[id].currency -= amount;
            await this.saveMemberData(memberData);
            return true;
        } else {
            return false;
        }
    }

    static getCurrency(id: string): number {
        if (memberData[id]) {
            return memberData[id].currency;
        } else {
            return 0;
        }
    }

    static async getLevel(id: string): Promise<number> {
        if (memberData[id]) {
            return memberData[id].level;
        } else {
            return 0;
        }
    }

    static async getExperience(id: string): Promise<number> {
        if (memberData[id]) {
            return memberData[id].experience;
        } else {
            return 0;
        }
    }

    static async setCurrency(id: string, amount: number): Promise<void> {
        if (memberData[id]) {
            memberData[id].currency = amount;
            await this.saveMemberData(memberData);
        }
    }

    static async checkMemberData(id: string): Promise<void> {
        if (!memberData[id]) {
            memberData[id] = {
                level: 1,
                experience: 0,
                currency: 0
            };
            await this.saveMemberData(memberData);
        }
    }

    static canLevelUp(id: string): boolean {
        const currentLevel = memberData[id].level;
        const currentExp = memberData[id].experience;
        const requiredExp = Math.floor(450 * Math.pow(1.15, currentLevel - 1));
        return currentExp >= requiredExp && currentLevel < 50;
    }

    static canLevelDown(id: string): boolean {
        const currentLevel = memberData[id].level;
        const currentExp = memberData[id].experience;
        const requiredExp = Math.floor(450 * Math.pow(1.15, currentLevel - 2));
        return currentExp < requiredExp && currentLevel > 1;
    }

    static async reduceExp(id: string, exp: number): Promise<void> {
        if (memberData[id]) {
            memberData[id].experience -= exp;
            if (this.canLevelDown(id)) {
                await this.reduceLevel(id, 1);
            }
            await this.saveMemberData(memberData);
        }
    }

    static async reduceLevel(id: string, levels: number): Promise<void> {
        if (memberData[id]) {
            memberData[id].level -= levels;
            if (memberData[id].level < 1) {
                memberData[id].level = 1;
            }
            await this.saveMemberData(memberData);
        }
    }

    static async saveMemberData(memberData: Member): Promise<void> {
        try {
            const data = JSON.stringify(memberData, null, 2);
            fs.writeFileSync(dataFilePath, data, 'utf-8');
        } catch (error) {
            console.error('Error saving member data:', error);
        }
    }
}

export default LevelService;