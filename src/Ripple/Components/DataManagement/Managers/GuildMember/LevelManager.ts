import { GuildMember, Message, TextChannel } from "discord.js";
import { GuildMemberDataManager } from "../../Base/GuildMemberDataManager";
import { DiscordChannel, RomanNumeral } from "../../../../Util";
import Ripple from "../../../../Client";

export interface Stats {
    Prestige: number,
    Level: number,
    XP: number
}

export class LevelManager implements GuildMemberDataManager<Stats> {
    public readonly Tag = "stats";
    public MaxLevel = 100;
    public MaxPrestige = 25;

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async AddMessage(msg: Message) {
        const member:GuildMember = msg.member;
        if (!member || member?.user.bot) return;

        const xpGain: number = await this.XPGain(member);
        const level: number = await this.GetLevel(member);
        const prefix: string = await this.Client.Prefix.Get(msg);
        
        await this.Client.Stats.AddXP(member, xpGain);
        const lvlAfterXPAdd: number = await this.GetLevel(member);
        const prestige: number = await this.GetPrestige(member);
        msg.guild.roles.cache.forEach(async role => {
            const prestigeMatch = await this.Client.PrestigeRoles.Get(role);
            if (prestige === prestigeMatch)
                await member.roles.add(role);
        });

        const channelID: string = await this.Client.LevelUpChannel.Get(msg);
        const channel: DiscordChannel = 
            channelID? 
                this.Client.channels.resolve(channelID) as TextChannel
                :msg.channel;
        
        if (level !== lvlAfterXPAdd) {
            const embed = this.Client.Embed(`Congratulations, ${member.user.tag}!`)
                .setDescription(`You leveled up! You are now level \`${(prestige !== 0 ? RomanNumeral(prestige) + "-" : "") + lvlAfterXPAdd}\`.` + 
                    (lvlAfterXPAdd === this.MaxLevel?
                    ` You can now prestige with \`${prefix}prestige\`.`
                    :"")
                );

            if(lvlAfterXPAdd === this.MaxLevel)
                channel.send(`${member}`)
                    .then(oldM => {
                        channel.send(embed).then(m => m.delete({ timeout: 3500 }));
                        oldM.delete({ timeout: 3500 });
                    });
            else
                channel.send(embed).then(m => m.delete({ timeout: 3500 }));
        }
    }

    public async XPUntilNextLevel(user: GuildMember): Promise<number> {
        const level: number = await this.GetLevel(user);
        const prestige: number = await this.GetPrestige(user);
        return (575 + (level ^ 2 - prestige ^ 1.3)) * ((level ^ -.9) / 1.8);
    }

    public async MaxXPGain(user: GuildMember): Promise<number> {
        const level: number = await this.GetLevel(user);
        const prestige: number = await this.GetPrestige(user);
        return Math.round(50 + (level ^ 1.3) * 6 * ((prestige + 1) ^ 1.1));
    }

    public async XPGain(user: GuildMember): Promise<number> {
        return 50 + Math.round(Math.random() * await this.MaxXPGain(user));
    }

    public async AddPrestige(user: GuildMember, amount: number = 1): Promise<boolean> {
        const prestige: number = await this.GetPrestige(user);
        if (prestige > this.MaxPrestige) return;

        await this.SetLevel(user, 1);
        await this.SetXP(user, 0)
        return this.SetPrestige(user, prestige + amount);
    }

    public async AddLevel(user: GuildMember, amount: number = 1): Promise<boolean> {
        const level: number = await this.GetLevel(user);
        await this.SetLevel(user, level + amount);
        return this.SetXP(user, 0);
    }

    public async AddXP(user: GuildMember, amount: number): Promise<boolean | undefined> {
        const xp: number = await this.GetXP(user);
        const level: number = await this.GetLevel(user);
        const untilNext: number = await this.XPUntilNextLevel(user);
        if (level === this.MaxLevel) return;

        if (xp >= untilNext) {
            const diff = xp - untilNext;
            await this.AddLevel(user, 1);
            return this.AddXP(user, diff);
        }

        return this.SetXP(user, xp + amount);
    }

    public async SetPrestige(user: GuildMember, prestige: number): Promise<boolean> {
        if (prestige > this.MaxPrestige) return;
        
        const stats: Stats = await this.Get(user);
        stats.Prestige = prestige;
        return this.Set(user, stats);
    }

    public async SetLevel(user: GuildMember, level: number): Promise<boolean> {
        if (level > this.MaxLevel) return;
        
        const stats: Stats = await this.Get(user);
        stats.Level = level;
        return this.Set(user, stats);
    }

    public async SetXP(user: GuildMember, xp: number): Promise<boolean> {
        const stats: Stats = await this.Get(user);
        stats.XP = xp;
        return this.Set(user, stats);
    }

    public async GetPrestige(user: GuildMember): Promise<number> {
        const stats: Stats = await this.Get(user);
        return stats.Prestige;
    }

    public async GetLevel(user: GuildMember): Promise<number> {
        const stats: Stats = await this.Get(user);
        return stats.Level;
    }

    public async GetXP(user: GuildMember): Promise<number> {
        const stats: Stats = await this.Get(user);
        return stats.XP;
    }

    public async Get(user: GuildMember): Promise<Stats> {
        return this.Client.Get(user, this.Tag, {
            Prestige: 0,
            Level: 1,
            XP: 0
        }, user.id);
    }

    public async Set(user: GuildMember, stats: Stats): Promise<boolean> {
        return this.Client.Set(user, this.Tag, stats, user.id);
    }
}