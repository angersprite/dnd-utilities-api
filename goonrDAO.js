import { createClient } from '@supabase/supabase-js'
import {} from 'dotenv/config'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export async function getRace(raceID) {
    if (raceID == -1) {
        let { data: Race, error } = await supabase
            .rpc('random_race')
        return Race
    }
    else if (raceID) {
        let { data: Race, error } = await supabase
            .from('Race')
            .select('*')
            .filter('id', 'eq', raceID)
        return Race
    }
    else {
        let { data: Race, error } = await supabase
            .from('Race')
            .select('*')
        return Race
    }
}

export async function getClass(classID) {
    if (classID == -1) {
        let { data: Class, error } = await supabase
            .rpc('random_class')
        return Class
    }
    else if (classID) {
        let { data: Class, error } = await supabase
            .from('Class')
            .select('*')
            .filter('id', 'eq', classID)
        return Class
    }
    else {
        let { data: Class, error } = await supabase
            .from('Class')
            .select('*')
        return Class
    }
}

export async function getFirstName() {
    let { data: FirstName, error } = await supabase
        .rpc('random_first_name')
    return FirstName
}

export async function getLastName() {
    let { data: LastName, error } = await supabase
        .rpc('random_last_name')
    return LastName
}

export async function getWeapon(classID) {
    let { data: Weapon, error } = await supabase
        .rpc('random_class_weapon', { class_id: classID })
    return Weapon
}

export async function getArmor(classID) {
    let { data: Armor, error } = await supabase
        .rpc('random_class_armor', { class_id: classID })
    return Armor
}

export async function getDescriptors(descCount) {
    let { data, error } = await supabase
        .rpc('random_descriptor', { count: descCount })
    return data
}

export async function getSkills(classID, descCount) {
    let { data, error } = await supabase
        .rpc('random_skill', { class_id: classID, count: descCount })
    return data
}

export async function getItems(itemCount) {
    let { data, error } = await supabase
        .rpc('random_item', { count: itemCount })
    return data
}