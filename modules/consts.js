/*

    Constant variables.

*/

let afterVerString = "";

if (process.env.DISABLE_SAVE == "yes") {
    afterVerString = " [BETA]"
}

module.exports = {
    VERSION: "19.2.2" + afterVerString,

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
        PINK: 13041919,
        GREEN: 4521796
    },

    HOLIDAYS: [
        {
            name: "Jarné prázdniny",
            date: new Date("02/23/2019 00:00:00 GMT+0100")
        },
        {
            name: "Veľkonočné prázdniny",
            date: new Date("04/18/2019 00:00:00 GMT+0100")
        },
        {
            name: "Maturita 2019",
            date: new Date("03/12/2019 00:00:00 GMT+0100")
        },
        {
            name: "Letné prázdniny",
            date: new Date("06/29/2019 00:00:00 GMT+0100")
        },
        {
            name: "Maturita 2022",
            date: new Date("03/12/2022 00:00:00 GMT+0100")
        },
    ],

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
        //Cody's jokes
        - "Čo si dáva kulturista v kaviarni? Benchpresso s mliekom",
        - "Viete aké auto vyhralo cenu za najlepšie auto roku 2018 podľa magazínu EVA?.....To modré",
        - "Ako sa volá miesto, kde hromadne zomierajú mačky? Mňauschwitz",
        - "Ako sa volá strážny pes čo nešteká? Mlčiak",
        - "Ako Freddie Mercury dostal AIDS? Len tak, z prdele"
    ],

    OWO_DM_REPLY_MSGS: [
        "Fucking kill me.",
        "Stop it. Get some help.",
        "Don't owo me, baka~~~~ >_<",
        "My disappointment is immeasurable and my day is ruined. Because of you.",
        "Don't you fucking dare do that again."
    ],

    NAMEDAYS: {
        1: {
            16: "Gordii",
            30: "Emma"
        },
        2: {
            24: "Matej",
            26: "Viktor",
            27: "Alex"
        },
        3: {
            7: "Tomáš"
        },
        4: {
            8: "Albert"
        },
        6: {
            7: "Robo",
            29: "Peťo"
        },
        7: {
            6: "Patrik",
            21: "Daniel",
            25: "Jakub"
        },
        9: {
            24: "Ľuboš",
            29: "Michal"
        },
        10: {
            15: "Tez",
            18: "Lukáš",
            30: "Šimon"
        },
        11: {
            11: 'Martin & Maros'
        },
        12: {
            17: "Nela",
            30: "Dávid"
        }
    },

    NAMEDAY_ARRAY: [
        "Nový rok", "Alexandra", "Daniela", "Drahoslav", "Andrea", "Antónia", "Bohuslava/Róbert", "Severín", "Alexej", "Dáša", "Malvína", "Ernest", "Rastislav", "Radovan", "Dobroslav", "Kristína", "Nataša" ,"Bohdana" ,"Drahomíra" ,"Dalibor" ,"Vincent" ,"Zora" , "Miloš" ,"Timotej" ,"Gejza" ,"Tamara" ,"Bohuš" ,"Alfonz" , "Gašpar" ,"Ema" ,"Emil" , "Tatiana" ,"Erika/Erik" ,"Blažej" ,"Veronika" ,"Agáta" ,"Dorota" , "Vanda" ,"Zoja" ,"Zdenko" ,"Gabriela" ,"Dezider" ,"Perla" , "Arpád" ,"Valentín" ,"Pravoslav" ,"Ida" ,"Miloslava" ,"Jaromír" , "Vlasta" ,"Lívia" ,"Eleonóra" ,"Etela" ,"Roman/Romana" , "Matej" ,"Frederik/Frederika" ,"Viktor" ,"Alexander" , "Zlatica" ,"" , "Albín" ,"Anežka" ,"Bohumil/Bohumila" ,"Kazimír" ,"Fridrich" , "Radoslav/Radoslava" ,"Tomáš/Róbert" ,"Alan/Alana" ,"Františka" , "Branislav/Bruno" ,"Angela/Angelika" ,"Gregor" ,"Vlastimil" , "Matilda" ,"Svetlana" ,"Boleslav" ,"Ľubica" ,"Eduard" ,"Jozef" , "Víťazoslav" ,"Blahoslav" ,"Beňadik" ,"Adrián" ,"Gabriel" , "Marián" ,"Emanuel" ,"Alena" ,"Soňa" ,"Miroslav" ,"Vieroslava" , "Benjamín" , "Hugo" ,"Zita" ,"Richard" ,"Izidor" ,"Miroslava" ,"Irena" , "Zoltán/Róbert" ,"Albert" ,"Milena" ,"Igor" ,"Július" ,"Estera" , "Aleš" ,"Justína" ,"Fedor" ,"Dana/Danica" ,"Rudolf" ,"Valér" , "Jela" ,"Marcel" ,"Ervín" ,"Slavomír" ,"Vojtech" ,"Juraj" , "Marek" ,"Jaroslava" ,"Jaroslav" ,"Jarmila" ,"Lea" , "Anastázia" , "Sviatok práce" ,"Žigmund" ,"Galina" ,"Florián" ,"Lesana/Lesia" ,"Hermína" , "Monika/Róbert" ,"Ingrida" ,"Roland" ,"Viktória" ,"Blažena" , "Pankrác" ,"Servác" ,"Bonifác" ,"Žofia" ,"Svetozár" ,"Gizela" , "Viola" ,"Gertrúda" ,"Bernard" ,"Zina" ,"Júlia/Juliana" , "Želmíra" ,"Ela" ,"Urban" ,"Dušan" ,"Iveta" ,"Viliam" ,"Vilma" , "Ferdinand" ,"Petronela/Petrana" , "Žaneta" ,"Xénia" ,"Karolína" ,"Lenka" ,"Laura" ,"Norbert" , "Róbert" ,"Medard" ,"Stanislava" ,"Margaréta" ,"Dobroslava" , "Zlatko" ,"Anton" ,"Vasil" ,"Vít" ,"Blanka" ,"Adolf" ,"Vratislav" , "Alfréd" ,"Valéria" ,"Alojz" ,"Paulína" ,"Sidónia" ,"Ján" , "Tadeáš" ,"Adriana" ,"Ladislav/Ladislava" ,"Beata" , "Peter/Pavol/Petra" ,"Melánia" , "Diana" ,"Berta" ,"Miloslav" ,"Prokop" ,"" ,"Patrik/Patrícia" , "Oliver" ,"Ivan" ,"Lujza" ,"Amália" ,"Milota" ,"Nina" ,"Margita" , "Kamil" ,"Henrich" ,"Drahomír" ,"Bohuslav" ,"Kamila" ,"Dušana" , "Iľja/Eliáš" ,"Daniel" ,"Magdaléna" ,"Oľga" ,"Vladimír" , "Jakub" ,"Anna/Hana" ,"Božena" ,"Krištof" ,"Marta" ,"Libuša" , "Ignác" , "Božidara" ,"Gustáv" ,"Jerguš" ,"Dominik/Dominika" ,"Hortenzia" , "Jozefína" ,"Štefánia" ,"Oskar" ,"Ľubomíra" ,"Vavrinec" , "Zuzana" ,"Darina" ,"Ľubomír" ,"Mojmír" ,"Marcela" ,"Leonard" , "Milica" ,"Elena/Helena" ,"Lýdia" ,"Anabela" ,"Jana" ,"Tichomír" , "Filip" ,"Bartolomej" ,"Ľudovít" ,"Samuel" ,"Silvia" ,"Augustín" , "Nikola/Nikolaj" ,"Ružena" ,"Nora" , "Drahoslava" ,"Linda" ,"Belo" ,"Rozália" ,"Regína" ,"Alica" , "Marianna" ,"Miriama" ,"Martina" ,"Oleg" ,"Bystrík" , "Mária" ,"Ctibor" ,"Ľudomil" ,"Jolana" ,"Ľudmila" ,"Olympia" , "Eugénia" ,"Konštantín" ,"Ľuboslav/Ľuboslava" ,"Matúš" ,"Móric" , "Zdenka" ,"Ľuboš/Ľubor" ,"Vladislav" ,"Edita" ,"Cyprián" , "Václav" ,"Michal/Michaela" ,"Jarolím" , "Arnold" ,"Levoslav" ,"Stela" ,"František" ,"Viera" ,"Natália" , "Eliška" ,"Brigita" ,"Dionýz" ,"Slavomíra" ,"Valentína" , "Maximilián" ,"Koloman" ,"Boris" ,"Terézia" ,"Vladimíra" , "Hedviga" ,"Lukáš" ,"Kristián" ,"Vendelín" ,"Uršuľa" ,"Sergej" , "Alojzia" ,"Kvetoslava" ,"Aurel" ,"Demeter" ,"Sabína" ,"Dobromila" , "Klára" ,"Šimon/Simona" ,"Aurélia" , "Denis/Denisa" ,"" ,"Hubert" ,"Karol" ,"Imrich" ,"Renáta" , "René" ,"Bohumír" ,"Teodor" ,"Tibor" ,"Martin/Maroš" ,"Svätopluk" , "Stanislav" ,"Irma" ,"Leopold" ,"Agnesa" ,"Klaudia" ,"Eugen" , "Alžbeta" ,"Félix" ,"Elvíra" ,"Cecília" ,"Klement" ,"Emília" , "Katarína" ,"Kornel" ,"Milan" ,"Henrieta" ,"Vratko" , "Ondrej/Andrej" , "Edmund" ,"Bibiána" ,"Oldrich" ,"Barbora" ,"Oto" ,"Mikuláš" , "Ambróz" ,"Marína" ,"Izabela" ,"Radúz" ,"Hilda" ,"Otília" , "Lucia" ,"Branislava/Bronislava" ,"Ivica" ,"Albína" ,"Kornélia" , "Sláva/Slávka" ,"Judita" ,"Dagmara" ,"Bohdan" ,"Adela" ,"Nadežda" , "Adam/Eva" ,"Vianoce" ,"Štefan" ,"Filoména" ,"Ivana/Ivona" ,"Milada" , "Dávid" ,"Silvester"
    ]
}