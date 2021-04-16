import {Strings, names} from '../utils/interfaces'
import React from "react";
import {Alert} from "antd";


const info_en = <p style={{textAlign: 'justify'}}>As a student accommodated in ŠD J13, you do not have to wear your dirty clothes to home.
    You can wash everything in the dormitory laundries. A total of 4 laundries are available,
    5/28, 5/48, 6/28 and 6/48. The procedure is simple - at the beginning of the semester, during
    the pre-announced registration (internet, laundries, gyms), you register and pay a fee
    to the Civic Association of the Student Council J13, part of which is used for maintenance
    and renovation of laundries. Our laundries open with an ISIC card, the chip number of which must
    be entered during registration. If you do not have an ISIC card, you can request a long-term loan of a
    chip to open laundries in the PC Club during office hours. If you want to wash, simply click
    on the page <a href={'rezervacie.intrak.sk'}>rezervacie.intrak.sk.</a>, book the time and the laundry that suits you best. During the selected time,
    the reserved laundry can be opened by your ISIC.<br/><strong> The maximum time of using the washing machine for
    one student is  4 hours per week.</strong> Pay attention to the chosen times! In case
    of violation of the rules of the laundry or failure to comply with the end of the washing period, your
    laundry account may be blocked and you will subsequently be prevented from washing for one month.
    For students who use boarding laundries, dryers, which are part of the laundries, are always available
    for 72 hours after washing. Access to the dryer for 15 minutes can be requested by clicking on the
    link Dryer on the site <a href={'rezervacie.intrak.sk'}>rezervacie.intrak.sk.</a> </p>

const info_sk = <p style={{textAlign: 'justify'}}>
    Ako študent ubytovaný v ŠD J13 si nemusíš svoje špinavé oblečenie nosiť domov. Všetko si môžeš vyprať v práčovniach
    internátu. Celkovo sú k dispozícií 4 práčovne, 5/28, 5/48, 6/28 a 6/48. Postup je jednoduchý - začiatkom semestra
    sa počas vopred ohláseného zápisu (internet, práčovne, posilňovne) zaregistruješ a zaplatíš poplatok do Občianskeho
    združenia ŠR J13, ktorého časť sa používa na údržbu a vynovovanie práčovní. Práčovne sa u nás otvárajú s ISIC
    kartou, ktorej číslo čipu je potrebné zadať pri registrácii. Ak ISIC kartu nemáš, môžeš v PCKlubovni počas úradných
    hodín požiadať o dlhodobé zapožičanie čipu na otváranie práčovní. Ak budeš chcieť prať, jednoducho klikneš na
    stránku <a href={'rezervacie.intrak.sk'}>rezervacie.intrak.sk.</a>, zarezervuješ si čas a práčovňu, ktorá ti najviac vyhovuje. Počas daného zvoleného
    času je možné rezervovanú práčovňu otvoriť tvojím ISIC-om.<br/><strong> Maximálny čas používania práčky pre jedného študenta
    sú 4 hodiny týždenne.</strong> Dávaj pozor na dodržiavanie zvolených časov! V prípade porušenia pravidiel práčovne alebo
    nedodržania konca doby prania môže byť tvoj účet práčovne zablokovaný a následne ti bude znemožnené prať po dobu
    jedného mesiaca. Pre študentov, ktorí používajú internátne práčovne, sú vždy na 72 hodín po praní k dispozícií aj
    sušiarne, ktoré sú súčasťou práčovní. Vstup do sušiarne na 15 minút je možné vyžiadať kliknutím na odkaz Sušiareň
    na stránke <a href={'rezervacie.intrak.sk'}>rezervacie.intrak.sk.</a>
</p>

const en : Strings = {
    laundry: 'Laundry',
    relax: 'Relax',
    info: 'Info',
    drying: 'Drying',
    account: 'Account', 
    reserve: 'Reserve',
    drying_info: 'You can access the drying room not further than 72 hours after your laudry reservation',
    main_info: <Alert message={info_en}
                      type={'info'}
                      
                    
    />,
    start_time: 'Start time',
    end_time: 'End time',
    logout: 'Logout',
    study_room: 'Study room',
    no_reservations: 'There are no reservations',
    reservation_ok: 'Reservation successfull',
    err_reservation_pending: 'You allready have reservation',
    err_reservation_overlap: 'Reservation overlapping',
    err_reservation_start_end: 'Invalid time',
    err_reservation_future: "Invalid time"
}

const sk = {
    laundry: 'Pracovna',
    relax: 'Relax',
    info: 'Informacie',
    drying: 'Susiaren',
    account: 'Konto',
    reserve: 'Zarezervovat',
    drying_info: 'Mozete sa dostat do susiarne najneskor ako 72 hodiny po rezervovani pracovni',
    main_info: <Alert message={info_sk}
                      type={'info'}
                      
                       />,
    start_time: 'Zacatok',
    end_time: 'Koniec',
    logout: 'Odhlasit sa',
    study_room: 'Studovna',
    no_reservations: 'Ziadna rezervacia',
    reservation_ok: 'Rezervaica uspesna',
    err_reservation_pending: 'Uz mate jednu rezervaciu',
    err_reservation_overlap: "Rezervacie sa prekrivaju",
    err_reservation_start_end: "Nespravny cas",
    err_reservation_future: "Nespravny cas"
}

const get_string = (locale:'en'|'sk', name:names):string | JSX.Element =>{
    
    if(locale === 'en'){
        return en[name]
    }
    if(locale === 'sk'){
        return sk[name]
    }

    return name
}

export {get_string}

