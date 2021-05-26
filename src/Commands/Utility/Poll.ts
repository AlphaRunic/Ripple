import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "poll";
        super(name, {
            aliases: [name, "newpoll"],
            cooldown: 5,
            description: {
                content: "Returns a poll with 2 reactions.",
                usage: "<pollQuestion>"
            },
            args: [
                {
                    id: "pollQuestion",
                    type: "string"
                }
            ]
        });
    }

    public async exec(msg: Message, { pollQuestion }: { pollQuestion: string }) {
        const client = this.client as RippleClient;

        if (!pollQuestion)
            return client.Logger.MissingArgError(msg, "pollQuestion");

        return msg.reply(
            client.Embed()
                .setTitle("Poll")
                .setDescription(pollQuestion + "?")
        )
            .then(sent => {
                sent.react("👍");
                return sent;
            })
            .then(sent => sent.react("👎"));
    }
}