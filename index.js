require("dotenv").config();

const {
  Client,
  GatewayIntentBits
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
  console.log(`Clipper Deobfuscator aktif sebagai ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const command = args.shift()?.toLowerCase();
  const code = args.join(" ");

  if (command === "help") {
    return message.reply(
      "**Clipper Deobfuscator Commands**\n\n" +
      "`.deobf <kode>` - Analisis kode\n" +
      "`.get <link>` - Ambil kode dari link (belum aktif)\n" +
      "`.detect <kode>` - Deteksi pola obfuscator\n" +
      "`.beautify <kode>` - Format kode sederhana\n" +
      "`.status` - Status bot\n" +
      "`.help` - Bantuan"
    );
  }

  if (command === "status") {
    return message.reply("🟢 Clipper Deobfuscator online.");
  }

  if (command === "deobf" || command === "detect") {
    if (!code) return message.reply("Masukkan kode yang ingin dianalisis.");

    const patterns = [
      ["Luraph", /Luraph/i],
      ["MoonSec", /MoonSec/i],
      ["IronBrew", /IronBrew/i],
      ["Prometheus", /Prometheus/i],
      ["PSU", /PSU/i],
      ["Hercules", /Hercules/i],
      ["Moonveil", /Moonveil/i]
    ];

    const found = patterns.filter(([name, regex]) => regex.test(code));

    return message.reply(
      "**Clipper Static Analysis**\n" +
      `Pola terdeteksi: ${found.length ? found.map(x => x[0]).join(", ") : "Belum dikenali"}\n` +
      "Catatan: Ini hanya deteksi pola, bukan deobfuscation penuh."
    );
  }

  if (command === "beautify") {
    if (!code) return message.reply("Masukkan kode yang ingin diformat.");

    return message.reply({
      content: "```lua\n" + code.slice(0, 1800) + "\n```"
    });
  }

  if (command === "get") {
    return message.reply("Fitur .get belum diaktifkan.");
  }
});

client.login(process.env.DISCORD_TOKEN);
