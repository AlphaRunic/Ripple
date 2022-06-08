"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelManager = void 0;
const tslib_1 = require("tslib");
const Util_1 = require("../../../../Util");
class LevelManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "stats";
        this.MaxLevel = 100;
        this.MaxPrestige = 25;
    }
    AddMessage(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const member = msg.member;
            if (!member || (member === null || member === void 0 ? void 0 : member.user.bot))
                return;
            const xpGain = yield this.XPGain(member);
            const level = yield this.GetLevel(member);
            const prefix = yield this.Client.Prefix.Get(msg);
            yield this.Client.Stats.AddXP(member, xpGain);
            const lvlAfterXPAdd = yield this.GetLevel(member);
            const prestige = yield this.GetPrestige(member);
            msg.guild.roles.cache.forEach((role) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const prestigeMatch = yield this.Client.PrestigeRoles.Get(role);
                if (prestige === prestigeMatch)
                    yield member.roles.add(role);
            }));
            const channelID = yield this.Client.LevelUpChannel.Get(msg);
            const channel = channelID ?
                this.Client.channels.resolve(channelID)
                : msg.channel;
            if (level !== lvlAfterXPAdd) {
                const embed = this.Client.Embed(`Congratulations, ${member.user.tag}!`)
                    .setDescription(`You leveled up! You are now level \`${(prestige !== 0 ? (0, Util_1.RomanNumeral)(prestige) + "-" : "") + lvlAfterXPAdd}\`.` +
                    (lvlAfterXPAdd === this.MaxLevel ?
                        ` You can now prestige with \`${prefix}prestige\`.`
                        : ""));
                if (lvlAfterXPAdd === this.MaxLevel)
                    channel.send(`${member}`)
                        .then(oldM => {
                        channel.send(embed).then(m => m.delete({ timeout: 3500 }));
                        oldM.delete({ timeout: 3500 });
                    });
                else
                    channel.send(embed).then(m => m.delete({ timeout: 3500 }));
            }
        });
    }
    XPUntilNextLevel(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const level = yield this.GetLevel(user);
            const prestige = yield this.GetPrestige(user);
            return (575 + (level ^ 2 - prestige ^ 1.5)) * ((level ^ -.9) / 1.8);
        });
    }
    MaxXPGain(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const level = yield this.GetLevel(user);
            const prestige = yield this.GetPrestige(user);
            return Math.ceil(50 + (level ^ 1.6) * 6 * (prestige + 1) ^ 1.1);
        });
    }
    XPGain(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return 50 + Math.round(Math.random() * (yield this.MaxXPGain(user)));
        });
    }
    AddPrestige(user, amount = 1) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const prestige = yield this.GetPrestige(user);
            if (prestige > this.MaxPrestige)
                return;
            yield this.SetLevel(user, 1);
            yield this.SetXP(user, 0);
            yield this.Client.Cash.Increment(user, 50 * (prestige ^ 1.15) / 1.5);
            return this.SetPrestige(user, prestige + amount);
        });
    }
    AddLevel(user, amount = 1) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const level = yield this.GetLevel(user);
            yield this.SetLevel(user, level + amount);
            yield this.Client.Cash.Increment(user, 25 * (level ^ 1.1) / 1.75);
            return this.SetXP(user, 0);
        });
    }
    AddXP(user, amount) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const xp = yield this.GetXP(user);
            const level = yield this.GetLevel(user);
            const untilNext = yield this.XPUntilNextLevel(user);
            if (level === this.MaxLevel)
                return;
            if (xp >= untilNext) {
                const diff = xp - untilNext;
                yield this.AddLevel(user, 1);
                return this.AddXP(user, diff);
            }
            return this.SetXP(user, xp + amount);
        });
    }
    SetPrestige(user, prestige) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (prestige > this.MaxPrestige)
                return;
            const stats = yield this.Get(user);
            stats.Prestige = prestige;
            return this.Set(user, stats);
        });
    }
    SetLevel(user, level) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (level > this.MaxLevel)
                return;
            const stats = yield this.Get(user);
            stats.Level = level;
            return this.Set(user, stats);
        });
    }
    SetXP(user, xp) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const stats = yield this.Get(user);
            stats.XP = xp;
            return this.Set(user, stats);
        });
    }
    GetLeaderboard(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const serverMembers = user.guild.members.cache.array().filter(m => !m.user.bot);
            const stats = yield Promise.all(serverMembers.map((m) => tslib_1.__awaiter(this, void 0, void 0, function* () { return [m, yield this.Client.Stats.GetPrestige(m), yield this.Client.Stats.GetLevel(m), yield this.Client.Stats.GetXP(m), yield this.Client.Stats.XPUntilNextLevel(m)]; })));
            const leaderboard = stats.sort((a, b) => {
                const xpuntilA = a[4];
                const xpuntilB = b[4];
                const xpA = a[3];
                const xpB = b[3];
                const lvlA = a[2];
                const lvlB = b[2];
                const prestigeA = a[1];
                const prestigeB = b[1];
                return (prestigeA + 1) + lvlA + (xpA / xpuntilA) - (prestigeB + 1) + lvlB + (xpB / xpuntilB);
            });
            return leaderboard
                .map(s => s[0])
                .reverse();
        });
    }
    GetLeaderboardRank(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield this.GetLeaderboard(user)).indexOf(user) + 1;
        });
    }
    GetPrestige(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const stats = yield this.Get(user);
            return stats.Prestige;
        });
    }
    GetLevel(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const stats = yield this.Get(user);
            return stats.Level;
        });
    }
    GetXP(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const stats = yield this.Get(user);
            return stats.XP;
        });
    }
    Get(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(user, this.Tag, {
                Prestige: 0,
                Level: 1,
                XP: 0
            }, user.id);
        });
    }
    Set(user, stats) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(user, this.Tag, stats, user.id);
        });
    }
}
exports.LevelManager = LevelManager;
