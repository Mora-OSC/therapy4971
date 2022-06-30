const Discord = require('discord.js')

module.exports = {
    name: "이모지등록",
    description: "서버에 이모지를 등록해요!",
    options: [
         {
            name: "이름",
            description: "등록 이모지의 이름을 입력해주세요.",
            type: "STRING",
            required: true
        },
        {
            name: "링크",
            description: "등록 이모지의 이미지URL을 입력해주세요.",
            type: "STRING",
            required: true
        }
    ],
    
async execute(interaction) {
const name = interaction.options.getString("이름")
const URL = interaction.options.getString("링크")
var type = "기본 이모지";

if (URL.startsWith("http")) {

if (URL.endsWith("gif")) {
type = "움직이는 이모지"
}

const embed = new Discord.MessageEmbed()
.setTitle("**이모지를 등록하시겠습니까?**")
.addFields(
{ name: "이모지 이름", value: name, inline: true },
{ name: "이모지 URL", value: "[바로가기](" + URL + ")", inline: true },
{ name: "이모지 타입", value: type, inline: true },
)
.setColor("#000001")

const row = new Discord.MessageActionRow()
.addComponents(new Discord.MessageButton()
.setCustomId("yes")
.setStyle("SUCCESS")
.setEmoji("<a:o_:990481098628800522>"))
.addComponents(new Discord.MessageButton()
.setCustomId("no")
.setStyle("DANGER")
.setEmoji("<a:emoji_45:990481176735150090>"))

const embed2 = new Discord.MessageEmbed()
.setTitle("<a:o_:990481098628800522> 이모지 등록을 수락하셨어요")
.addFields(
{ name: "이모지 이름", value: name, inline: true },
{ name: "이모지 URL", value: "[바로가기](" + URL + ")", inline: true },
{ name: "이모지 타입", value: type, inline: true },
)
.setColor("#000001")

const embed3 = new Discord.MessageEmbed()
.setTitle("<a:emoji_45:990481176735150090> 이모지 등록을 거절하셨어요")
.addFields(
{ name: "이모지 이름", value: name, inline: true },
{ name: "이모지 URL", value: "[바로가기](" + URL + ")", inline: true },
{ name: "이모지 타입", value: type, inline: true },
)
.setColor("#000001")

interaction.reply({ content: "채널에 전송된 버튼으로 작동해주세요", ephemeral: true })
interaction.channel.send({ embeds: [embed], components: [row] }).then(async (collector) => { 
collector.createMessageComponentCollector().on('collect', async i => {

if (interaction.user.id == i.user.id) {
if (i.customId == "yes") {
interaction.guild.emojis.create(URL, name)
i.update({ embeds: [embed2], components: [] })
}

if (i.customId == "no") {
i.update({ embeds: [embed3], components: [] })
}
}else{
i.reply({ content: "이 버튼은 " + interaction.user.tag + "님만 사용할수 있어요", ephemeral: true })
}
})
})
}
}
}