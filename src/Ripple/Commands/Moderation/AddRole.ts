import { Command } from "discord-akairo";
import { GuildMember, Message, Role } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "addrole";
        super(name, {
            aliases: [name, "giverole", "role", "promote"],
            userPermissions: "MANAGE_ROLES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 5e3,
            description: {
                content: "Adds a role to a member.",
                usage: "<@role> <@member>"
            },
            args: [
                Arg("role", "role"),
                Arg("member", "member", msg => msg.member)
            ],
        });
    }

    public async exec(msg: Message, { role, member }: { role: Role, member: GuildMember }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");
        
        if (!role)
            return this.client.Logger.MissingArgError(msg, "role");        

        return member.roles.add(role)
            .then(() => msg.reply(
                this.client.Success()
                    .setDescription(`Successfully added ${role} to ${member}.`)
            )).catch(err => this.client.Logger.DiscordAPIError(msg, err));
    }
}