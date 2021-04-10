const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

vote1 = "https://serveur-prive.net/minecraft/orezia-8112/vote";
vote2 = "https://vote.top-serveurs.net/minecraft/orezia";
vote3 = "https://www.liste-serveurs-minecraft.org/vote/?idc=202197";
vote4 = "https://www.serveursminecraft.org/serveur/5437/";
vote5 = "https://serveur-prive.net/minecraft/orezia-8487/vote";
tempsVote1 = 5395000; //1H30 en ms
tempsVote2 = 7195000; //2H en ms
tempsVote3 = 10795000; //3H en ms
tempsVote4 = 86395000; //24H en ms
tempsVote5 = 5395000; //24H en ms
intervalCheckTime = 5000; //Le temps entre chaque verification de channel

async function postVote(chan,lien){
    role = await chan.guild.roles.cache.find(role => role.name === chan.name);
    if(lien === vote1){
        chan.send("<@&"+role.id+"> Il est temps de voter ici ! : "+lien).then(sentMessage => {
            sentMessage.react('😆');
        });
    }
    if(lien === vote2){
        chan.send("<@&"+role.id+"> Il est temps de voter ici ! : "+lien).then(sentMessage => {
            sentMessage.react('😉');
        });
    }
    if(lien === vote3){
        chan.send("<@&"+role.id+"> Il est temps de voter ici ! : "+lien).then(sentMessage => {
            sentMessage.react('😊');
        });
    }
    if(lien === vote4){
        chan.send("<@&"+role.id+"> Il est temps de voter ici ! : "+lien).then(sentMessage => {
            sentMessage.react('✅');
        });
    }
    if(lien === vote5){
        chan.send("<@&"+role.id+"> Il est temps de voter ici ! : "+lien).then(sentMessage => {
            sentMessage.react('☑️');
        });
    }
}

async function createChannel(message, chanName) {
    const tempo1= await message.guild.channels.create(chanName, {
        type: 'text',
        parent: '750998295404609606'
    });
    await message.guild.roles.create({ data : { 
        name : chanName
    }});
    newRole = await message.guild.roles.cache.find(role => role.name === chanName);
    message.member.roles.add(newRole);
    tempo1.send("Bienvenu sur ton canal de vote, tu peux récupérer le role qui sera ping sur le canal en réagissant à ce message").then(sentMessage => {
        sentMessage.react('😄');
    });
    postVote(tempo1,vote1);
    postVote(tempo1,vote2);
    postVote(tempo1,vote3);
    postVote(tempo1,vote4);
    postVote(tempo1,vote5);
    setInterval(checkTime,intervalCheckTime,tempo1);
    return tempo1
}

async function checkTime(chan){
    currentTime = new Date();
    listeMessages = await chan.messages.fetch();
    listeMessages.forEach(async element =>  {
        if(element.partial){
            await element.fetch()
        }
        if(element.content.includes("site 1") && currentTime - element.createdAt > tempsVote1){
            element.delete();
            postVote(chan,vote1);
        }
        if(element.content.includes("site 2") && currentTime - element.createdAt > tempsVote2){
            element.delete();
            postVote(chan,vote2);
        }
        if(element.content.includes("site 3") && currentTime - element.createdAt > tempsVote3){
            element.delete();
            postVote(chan,vote3);
        }
        if(element.content.includes("site 4") && currentTime - element.createdAt > tempsVote4){
            element.delete();
            postVote(chan,vote4);
        }
        if(element.content.includes("site 5") && currentTime - element.createdAt > tempsVote5){
            element.delete();
            postVote(chan,vote5);
        }
    });
}


//Toutes les actions à faire quand le bot se connecte
client.on("ready", async function () {
    console.log("Mon BOT est Connecté");
    guild = await client.guilds.fetch('750991182330331247');
    chanGen = await guild.channels.cache.get('750991182330331250');
    chanGen.send("Bonjour à tous, je viens de démarrer !");
    cat = await guild.channels.cache.get('750998295404609606');
    arrayChildren = cat.children.array();
    arrayChildren.forEach(element => {
        setInterval(checkTime,intervalCheckTime,cat.children.get(element.id));
    });
})

client.login(process.env.BOT_TOKEN);
//process.env.BOT_TOKEN
client.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
    // Now the message has been cached and is fully available
    if(reaction.message.content.includes("Bienvenu sur ton canal de vote, tu peux récupérer le role") && reaction.message.author.id === "750988385685864488"  && reaction.emoji.name === '😄' && user.id !== "750988385685864488" ){
        reaction.users.remove(user);
        member = reaction.message.guild.member(user);
        if(member.roles.cache.some(role => role.name.toLowerCase() === reaction.message.channel.name)){
            newRole = await reaction.message.guild.roles.cache.find(role => role.name === reaction.message.channel.name);
            member.roles.remove(newRole);
        }
        else{
            newRole = await reaction.message.guild.roles.cache.find(role => role.name === reaction.message.channel.name);
            member.roles.add(newRole);
        }
    }
    if(reaction.message.author.id === "750988385685864488"  && reaction.emoji.name === '😆' && user.id !== "750988385685864488"){
        reaction.message.delete({ timeout: 10000, reason: 'A voté' });
        reaction.message.channel.send("Tu as bien voté pour le site 1 !");
    }
    if(reaction.message.author.id === "750988385685864488"  && reaction.emoji.name === '😉' && user.id !== "750988385685864488"){
        reaction.message.delete({ timeout: 10000, reason: 'A voté' });
        reaction.message.channel.send("Tu as bien voté pour le site 2 !");
    }
    if(reaction.message.author.id === "750988385685864488"  && reaction.emoji.name === '😊' && user.id !== "750988385685864488"){
        reaction.message.delete({ timeout: 10000, reason: 'A voté' });
        reaction.message.channel.send("Tu as bien voté pour le site 3 !");
    }
    if(reaction.message.author.id === "750988385685864488"  && reaction.emoji.name === '✅' && user.id !== "750988385685864488"){
        reaction.message.delete({ timeout: 10000, reason: 'A voté' });
        reaction.message.channel.send("Tu as bien voté pour le site 4 !");
    }
    if(reaction.message.author.id === "750988385685864488"  && reaction.emoji.name === '☑️' && user.id !== "750988385685864488"){
        reaction.message.delete({ timeout: 10000, reason: 'A voté' });
        reaction.message.channel.send("Tu as bien voté pour le site 5 !");
    }
});

client.on('message', async message => {
    if(message.content.includes("Chan : ")){
        chanName = message.content.split(" : ")[1];
        newChan = createChannel(message, chanName.toLowerCase());
    }
	console.log(message.content);
});