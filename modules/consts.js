/*

    Constant variables.

*/

module.exports = {
    WEEK_DAYS: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"],
    WEEK_DAYS_SHORT: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"],

    RESTRICTED_MODE: false,

    TEST_CHANNEL_ID: 514873440159793167,

    DEV_USERID: 342227744513327107,

    discordBotConfig: {
        token: process.env.DISCORD_BOT_TOKEN,
        prefix: "!" // Prefix for the bot commands
    },

    COLORS: {
        RED: 16720418,
        YELLOW: 14540032,
        BLUE: 1616639,
        GREEN: 4521796
    },

    TIMETABLE: [
        ['Víkend'],
        ['Stn', 'Mat', 'Aj / Tsv', 'Zeq', 'ProP / Aj', 'Fyz', 'Sjl'],
        ['Dej', 'Inf', 'Inf', 'Stn(K) / Aj', 'ZeqC / Mat', 'Obn', 'Aj / Zeq(C)'],
        ['Nbv', 'Zeq', 'Zer', 'Zer', 'Pro', 'Tsv / Pro(P)', 'Mat / Stn(K)', 'Mech'],
        ['Prax', 'Prax', 'Prax', 'Mat / Sjl', 'Sjl / Mat', 'Sjl'],
        ['Stn', 'Zeq', 'Fyz / Tsv', 'Aj', 'Mat', 'Tsv / Fyz', 'Etv'],
        ['Víkend'],
    ],

    JOKES: [ // Credits to Dan Valnicek
        `Spýtal som sa mojej dcéry, či by mi podala noviny. Povedala mi, že noviny sú stará škola. Povedala, že ľudia dnes používajú tablety a podala im iPad. Mucha nemala šancu.`,
        `Vždy som si myslela, že moji susedia sú celkom milí ľudia. Ale potom si dali heslo na Wi-Fi.`,
        `Pred dvoma rokmi som sa pozval dievča svojich snov na rande, dnes som ju požiadal o ruku.
        Obidva krát povedala nie.`,
        `"Mami, neľakaj sa, ale som v nemocnici."
        "Synu, prosím ťa. Si tam chirurg už 8 rokov. Môžeme začať naše telefonáty inak?"`,
        `Muž hovorí žene: "Vieš, čim chce byť náš 6-ročný syn, keď bude veľký?"
        Manželka: "Nie"
        Muž: "Smetiarom. A vieš prečo? "
        Manželka: "Nie, prečo?"
        Muž: "Pretože si myslí, že pracujú iba v utorok."`,
        // haha jokes
        `Stretnú sa dvaja povaľači. Prvý sa tak zamyslí a vraví:
        - Človeče, keby nebol ten INTERNET, sedel by som celý deň pri telke!`,
        `Čo znamená názov systému WINDOWS? Nenechajte sa oblafnúť, že Microsoftu ide o nejaké okná. V skutočnosti ide o akronym z posledných slov indiánskeho náčelníka sediaceho býka, ktoré povedal vo svojom rodnom siouxskom nárečí. V slovenskom preklade veštba znie:
        "Zvíťazí Biely Muž Čumiaci Na Presýpacie Hodiny!"`,
        `- Viete, ako sa prežehnáva počítačový fanatik?
        - V mene otca i syna, i ducha enter.`,
        `Ide programátor o 18.00 z práce a stretne šéfa, ktorý sa ho pýta: 
        - Čo ty tak zavčasu? Zobral si si pol dňa dovolenky? 
        - Nie, len si skočím na obed.`,
        `- Viete, ako sa povie Linux po španielsky?
        - Adios BIOS.`,
        `Život by bol jednoduchší, keby sme k nemu mali zdrojový kód.`,
        `Programátor hovorí programátorovi:
        - Moja babka má dnes 64 rokov.
        - Že gratulujem k peknému okrúhlemu výročiu...`,
    ],

    
}