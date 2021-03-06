import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "members";
        super(name, {
            aliases: [name, "membercount", "memberamount"],
            description: "Returns the amount of members in the guild executed in."
        });
    }

    public async exec(msg: Message) {
        return msg.reply(
            this.client.Embed("Member Count")
                .setDescription(`\`${msg.guild.name}\` has \`${msg.guild.memberCount}\` members.`)
        );
    }
}