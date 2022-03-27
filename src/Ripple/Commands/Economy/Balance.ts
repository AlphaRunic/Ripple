import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "balance";
        super(name, {
            aliases: [name, "bal", "bank", "mybalance", "cash", "mybal"],
            description: {
                content: "Returns your cash balance for specific server.",
                usage: "<@member?>"
            },
            args: [
                Arg("member", "member", msg => msg.member),
            ]
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "Bots do not have cash balances.");
        if (!member) 
            return this.client.Logger.MissingArgError(msg, "member");
            
        return msg.reply(
            this.client.Embed(`${member.user.username}'s Balance`)
                .setDescription("$" + CommaNumber(await this.client.Cash.Get(member)))
        );
    }
}