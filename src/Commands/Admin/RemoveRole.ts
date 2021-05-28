import { Command } from "discord-akairo";
import { GuildMember, Message, Role} from "discord.js";
import { Arg } from "../../Ripple/Util";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "removerole";
        super(name, {
            aliases: [name, "deleterole", "delrole", "unrol"],
            userPermissions: "MANAGE_ROLES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 5,
            description: {
                content: "Removes a role from a member.",
                usage: "<@member> <@role>"
            },
            args: [
                Arg("role", "role"),
                Arg("member", "member", msg => msg.member)
            ],
        });
    }

    public async exec(msg: Message, { role, member }: { role: Role, member: GuildMember}) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");
        
        if (!role)
            return this.client.Logger.MissingArgError(msg, "role");        

        return member.roles.remove(role)
            .then(() => msg.reply(
                this.client.Success()
                    .setDescription(`Successfully removed ${role} from ${member}.`)
            )).catch(err => this.client.Logger.DiscordAPIError(msg, err));
    }
}