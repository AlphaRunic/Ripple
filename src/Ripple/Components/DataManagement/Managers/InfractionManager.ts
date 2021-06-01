import { GuildMember } from "discord.js";
import { GuildMemberDataManager } from "../Base/GuildMemberDataManager";
import Ripple from "../../../Client";

export class Infraction {
    public constructor(
        public Issuer: GuildMember,
        public Recipient: GuildMember,
        public Reason: string
    ) {}
}

export class InfractionManager implements GuildMemberDataManager<Infraction[]> {
    public Tag = "infractions";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Find(user: GuildMember, index: number): Promise<Infraction> {
        const infractions: Infraction[] = await this.Get(user);
        return infractions[index];
    }

    public async Remove(user: GuildMember, infraction: Infraction): Promise<boolean> {
        const infractions: Infraction[] = await this.Get(user);
        const idx = infractions.indexOf(infraction);
        infractions.splice(idx - 1, 1);
        return this.Set(user, infractions);
    }

    public async Add(user: GuildMember, infraction: Infraction): Promise<boolean> {
        const infractions: Infraction[] = await this.Get(user);
        infractions.push(infraction);
        return this.Set(user, infractions);
    }

    public async Get(user: GuildMember, defaultValue?: Infraction[]): Promise<Infraction[]> {
        return this.Client.Get(user, this.Tag, defaultValue?? [], user.id);
    }

    public async Set(user: GuildMember, value: Infraction[]): Promise<boolean> {
        return this.Client.Set(user, this.Tag, value, user.id);
    }
}