# Wiseproov

See on proovitöö Trinidad Wisemanile. 

## Eesmärk

Luua Angularis veebileht, mille funktsionaalsused kattuksid üksühele näidislehega ja mille kujundus oleks soovitavalt originaalilähedane. Andmeallikaks API inimeeste loeteleluga, kus iga kirje juures on ka pilte ja artikkel "Lorem ipsum" keeles. 

## Senine tulemus

### Kujundus vägagi originaalilähedane
Kujundasin veebilehe võrdlemisi sarnaselt originaalile, kuid muudetud värvidega. Algsest rohelisest esiletõstutekstist on saanud kollane. Ka taustapiltidel on roheliste täppide asemel kollased täpid. Ka logo panin enda oma. 

### Andmed - kõik 500 vs 108 kirjet

Erinevalt ülesandelehest on siin API'st kaasatud kõik 500 kirjet, kuid koos võimalusega lülitada tabelivaade ümber 108 kirjele. 

_Täpsemalt öeldes kasutasin põhimõtet "toome kõik kirjed sõltumata nende arvust". Kuna API-s andmete reastamise võimalust pole, tuleb seda teha frontendis ja seetõttu on vaja kogu nimekirja._ 

_"Pimesi" kogu nimekirja tõmbamine tundus esialgu võimatu, sest eraldi päringut selleks pole. limit=0 annab tühja nimekirja, limit=-1 tagastab kõigi asemel kõik miinus 1 ehk antud juhul 500 asemel 499._

_Lahenduseks osutus siiski "limit=0". Sõltumata päritud kirjete arvust näidatakse statistika objktis alati kirjete koguarvu. Seega - kaks päringut. Esimesega saame teada, kui pika nimekirjaga saame arvestada. Teises päringus kasutame aga esimesest saadud statistikat. Esimene päring ütleb, et limit=0, teine aga, et limit=tulemus.stats.total_


### Esileht
![image](https://user-images.githubusercontent.com/1138055/150769959-5910ed5c-619a-400a-85cb-33fed3fd0279.png)
Originaalis viib esilehele klikkamine logole, selles versioons aga klikk saidi nimele

### Tabel koos ühe kirje avatud eelvaatega
![150770661-1d3696a5-4a1c-4308-bbe3-31d90998f158](https://user-images.githubusercontent.com/1138055/151221284-c30f900a-c386-4e4e-83b9-eba911b65132.png)
Erinevus võrreldes originaaliga - pilt ei ole ruuduks kärbitud, teksti väljavõtte all aga on link täiskirjele, mis algversioonis puudus. Tabeli päises on üks väik kollane ja üks suur helehall nupp, mis teevad üht ja sama - lülitavad vaate ümber 500 kirjelt 108-le ja vastupidi. Loomulikult mitte eeldusel, et midagi sellist ka päriselus vaja läheb, vaid puhtalt eelmainitud erinevuse tõttu ülesandelehest. 


### Kirje üksikasjade (artikli) vaade
![image](https://user-images.githubusercontent.com/1138055/150771307-53981635-4eaa-45f9-a048-a97e11978eaa.png)
![image](https://user-images.githubusercontent.com/1138055/150771560-951931c1-24aa-4daf-a075-80b3705227c8.png)
Hetkel on siin vähem kujundamistöid tehtud kui originaalis (pean silmas just pilte). Teisalt on artikli algusesse toodud ka inimese nimi kinnitamaks visuaalselt, et näeme just selle isiku kirjet, kelle oma me lingi teel avasime. Kolmandaks on all nn chip'ide hulka kaasatud ka tõeväärtuseväli, mis puudus originaalis. Värv ilmub siis, kui kursor on chipi kohal. 

Kui URLis on lihtsalt /article, siis avaneb seesama "valveartikkel", mille link oli ära toodud ülesande juures. Lisades lõppu id, näiteks /article/1617a8fc , avaneb selle id-ga isiku kirje. 

### Ootavad lahendust

![image](https://user-images.githubusercontent.com/1138055/150772956-3d0ab113-522e-403e-acf6-a2574037ff0a.png)
Menüü sulgub kitsama vaate juures, kuid praegu menüünupp veel menüüd ei ava. **EDIT: Lahendatud!** 

![150774201-0368a8be-d4be-4a4b-bdaa-df43adc32d48](https://user-images.githubusercontent.com/1138055/151221291-b08b9af7-ca3e-4718-9ff8-b6f46be19398.png)
Navigeerimisnuppe võiks sellise lahenduse juures olla rohkem kui üks. **EDIT: Lahendatud, vt kõige alumist navigatsiooniriba pilti** Alternatiiv oleks muidugi näidata kõiki nuppe. 

![150774949-571b5b9a-7b97-4eca-9b7e-b836a8691912](https://user-images.githubusercontent.com/1138055/151221299-40eb2ddc-16cd-4d52-8e46-f59e7fb6c795.png)
Siin ongi kõik nupud nähtaval. 108 rida vs kõik 500 rida. 

## Vaegtöövajadus backendi poolel

Ilmselt on seegi õppeotstarbeline praak, aga ltr-märgend kahe eesnime ees ei lubanud neid nagu kord ja kohus nimede järjestamisse kaasata. Tõsi, frontendis tegin sellele ajutise lahenduse, kus need märgendid ära koristatakse, kuid see on ju tegelikult backendi probleem, kas pole? Selle kohta lõin siia ka probleemipostituse. VT https://github.com/jaanusnurmoja/wiseproov/issues/1

## Kas "Game of life" on ka osa ülesandest?

![image](https://user-images.githubusercontent.com/1138055/150776906-fbc27821-1411-472d-8e8c-ef81e9194b4b.png)

Esimese hooga ei lugenud ma ülesandepüstitusest üldse välja, et ka see oleks osa komplektist. Aga vist ikkagi on? Minu jaoks mõneti  "eksootiline" teema (ja ma pole kindel ei selles, et ma sellegi ära teen, ega ka selles, et ei tee :D ), Igal juhul jätan selle kõige lõpuks, kui ma teiste tööde tulemusega piisavalt rahul olen :) 

# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
