import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";
import { Arg, RandomElement } from "../../Util";
import PornHub = require("pornhub.js");
const ph = new PornHub();

interface PornHubRes {
    data: {
        title: string;
        url: string;
        duration: string;
        hd: boolean;
        premium: boolean;
        preview: string
    }[];
}

export default class extends APICommand {
    public constructor() {
        const name = "pornhub";
        super(name, {
            aliases: [name, "pornhubsearch", "phsearch", "ph"],
            description: {
                content: "Returns a PornHub video based on your search query.",
                usage: '<"query">'
            },
            args: [ Arg("query", "string") ]
        });
    }

    public async exec(msg: Message, { query }: { query: string }) {
        if (!query)
            return this.client.Logger.MissingArgError(msg, "query");

        return ph.search("Video", query)
            .then(({ data }: PornHubRes) => {
                const media = RandomElement(data);
                const thumbnail = media.preview;
                return msg.reply(
                    this.client.Embed(media.title)
                        .setURL(media.url)
                        .setThumbnail(thumbnail)
                        .setAuthor(`Length: ${media.duration}`)
                        .addField("HD", media.hd ? "Yes" : "No", true)
                        .addField("PH Premium", media.premium ? "Yes" : "No", true)
                        .setColor("E86F0C")
                )
            }).catch(err => this.client.Logger.APIError(msg, err));
    }
}