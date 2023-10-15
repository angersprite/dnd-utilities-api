import * as goonrDAO from './goonrDAO.js'
import NPC from './NPC.js'

export default async function generateNPC(classID, raceID) {
    let npc = new NPC

    await goonrDAO.getClass(classID)
        .then(c => {
            npc.className = c[0].name
            npc.hitPoints = Math.floor(Math.random() * (c[0].hit_die - 1 + 1)) + 1
            npc.toHit = c[0].thac0
            classID = c[0].id
        })

    await goonrDAO.getRace(raceID)
        .then(r => {
            npc.race = r[0].name
        })

    await goonrDAO.getFirstName()
        .then(fn => {
            npc.firstName = fn
        })

    await goonrDAO.getLastName()
        .then(ln => {
            npc.lastName = ln
        })

    // get armor + weapon for class id
    await goonrDAO.getWeapon(classID)
        .then(w => {
            if (w.length > 0) {
                npc.weapon = w[0].name
                npc.weaponDamage = w[0].damage
            }
        })
    
    await goonrDAO.getArmor(classID)
        .then(a => {
            if (a.length > 0) {
                npc.armorType = a[0].name
                npc.armorClass = a[0].armor_class
            }
        })
    
    // get random descriptors
    await goonrDAO.getDescriptors(1)
        .then(desc => {
            npc.descriptors = desc
        })
    // get skills
    await goonrDAO.getSkills(classID, 1)
        .then(skills => {
            npc.skills = skills
        })
    // get items
    await goonrDAO.getItems(1)
        .then(i => {
            npc.items = i
        })

    //console.log(classID, raceID, npc)
    return npc
}