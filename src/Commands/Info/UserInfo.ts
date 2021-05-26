import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { StripISO } from "../../Ripple/Util";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "userinfo";
        super(name, {
            aliases: [name, "memberinfo"],
            description: {
                content: "Returns information about the user provided, or yourself.",
                usage: "<@member?>"
            },
            args: [
                {
                    id: "member",
                    type: "member"
                }
            ]
        });
    }

    public async exec(msg: Message, { member = msg.member }: { member: GuildMember }) {
        const client = this.client as RippleClient;

        return msg.reply(
            client.Embed()
                .setTitle(member.user.username + "#" + member.user.discriminator)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addField("Joined Discord On", StripISO(member.user.createdAt), true)
                .addField("Joined Server On", StripISO(member.joinedAt), true)
                .addField("Nitro Since", member.premiumSince ? StripISO(member.premiumSince) : "Never", true)
                .addField("Last Message", member.lastMessage.content, true)
                .addField("Roles", member.roles.cache.array(), true)
                .addField("Manageable", member.manageable ? "Yes" : "No", true)
                .setColor(msg.member.displayHexColor)
        );
    }
}