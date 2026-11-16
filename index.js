
const {
  Client,
  GatewayIntentBits,
  AttachmentBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const PREFIX = ".";

client.once("ready", () => {
  console.log(`Clipper Deobfuscator online: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(1).trim().split(/\s+/);
  const command = args.shift()?.toLowerCase();
  const input = args.join(" ");

  try {
    if (command === "help") {
      return message.reply(
        "**CLIPPER DEOBFUSCATOR**\n\n" +
        "`.deobf <kode>` - Analisis kode\n" +
        "`.detect <kode>` - Deteksi obfuscator\n" +
        "`.get <url>` - Ambil source dari link\n" +
        "`.beautify <kode>` - Rapikan kode\n" +
        "`.status` - Status bot\n" +
        "`.help` - Bantuan"
      );
    }

    if (command === "status") {
      return message.reply("🟢 Clipper Deobfuscator ONLINE.");
    }

    if (command === "deobf" || command === "detect") {
      if (!input) return message.reply("Masukkan kode Lua/Luau.");

      const signatures = {
        Luraph: /Luraph|LPH_/i,
        MoonSec: /MoonSec|MSEC/i,
        IronBrew: /IronBrew|IB2/i,
        Prometheus: /Prometheus/i,
        Hercules: /Hercules/i,
        Moonveil: /Moonveil/i,
        IronVeil: /IronVeil/i,
        PSU: /PSU/i,
        Boronide: /Boronide/i,
        GoofyScator: /GoofyScator/i,
        Jayfuscator: /Jayfuscator/i,
        "77fuscator": /77fuscator/i,
        LuaQ: /LuaQ/i
      };

      const found = Object.entries(signatures)
        .filter(([, regex]) => regex.test(input))
        .map(([name]) => name);

      return message.reply(
        `**CLIPPER ANALYSIS**\n` +
        `• Lines: ${input.split("\n").length}\n` +
        `• Size: ${Buffer.byteLength(input)} bytes\n` +
        `• Detected: ${found.join(", ") || "Unknown"}\n\n` +
        "Analisis berbasis signature, bukan jaminan identifikasi."
      );
    }

    if (command === "beautify") {
      if (!input) return message.reply("Masukkan kode Lua/Luau.");

      const file = new AttachmentBuilder(
        Buffer.from(input, "utf8"),
        { name: "clipper-output.lua" }
      );

      return message.reply({
        content: "File kode berhasil dibuat. Ini belum deobfuscation penuh.",
        files: [file]
      });
    }

    if (command === "get") {
      return message.reply(
        "Fitur `.get` akan kita integrasikan setelah modul pengambilan source dibuat."
      );
    }

  } catch (error) {
    console.error(error);
    message.reply("Terjadi kesalahan saat memproses perintah.");
  }
});

client.login(process.env.DISCORD_TOKEN);
