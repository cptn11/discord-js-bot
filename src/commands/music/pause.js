const { Command } = require("@src/structures");
const { MessageEmbed, Message } = require("discord.js");

module.exports = class Pause extends Command {
  constructor(client) {
    super(client, {
      name: "pause",
      description: "Pause the current song",
      command: {
        enabled: true,
        category: "MUSIC",
      },
      slashCommand: {
        enabled: false,
      },
    });
  }

  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async messageRun(message, args) {
    const queue = message.client.player.getQueue(message.guildId);
    if (!queue || !queue.playing) return message.channel.send("No music is being played!");

    const paused = queue.setPaused(true);

    const embed = new MessageEmbed().setDescription(paused ? "🎵 | Music Paused | ⏸" : "🎵 |  Music Already Paused");
    return message.channel.send({ embeds: [embed] });
  }
};
