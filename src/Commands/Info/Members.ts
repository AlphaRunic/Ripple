import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "members";
        super(name, {
            aliases: [name, "membercount", "memberamount"],
            description: "Returns the amount of members in the guild executed in."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        return msg.channel.send(`This server has ${msg.guild.memberCount} members.`);
    }
}