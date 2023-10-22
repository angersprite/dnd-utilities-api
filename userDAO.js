import { createClient } from '@supabase/supabase-js'
import {} from 'dotenv/config'
import * as bcrypt from 'bcrypt'
import { sendEmail } from './emailService'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

export async function registerUser(userName, email, password) {
    let hashedPW = await bcrypt.hash(password, 10)
    const { data: confirmationToken, error } = await supabase
        .rpc('register_user', {
            user_name: userName, email: email, hashed_password: hashedPW, 
        })
    // send confirmation email
    if (error) {
        console.log(error)
        return false
    }
    else {
        console.log(data)
        const mailSubject = 'RPG Utilities Registration'
        const mailBody = `To Activate your account please visit this link: https://goonr-9cn.pages.dev/confirmEmail/${confirmationToken}`
        sendEmail(email, mailSubject, mailBody)
        return true
    }
}

export async function tryLogin(userName, password) {
    // get hashed pw from supabase
    // bcrypt compare hashed pw with given password
    return true
}

export async function getUserProfile(userID) {
    // query supabase for user's info and return it
    const { data: userProfile, error } = await supabase
        .from('User')
        .select('user_name,email')
    
    return userProfile
}

export async function resetPasswordEmail(userName) {
    // query supabase for matching username
    // update supabase with reset token and timestamp
    // send password reset email to user with link to reset page + reset token

    return true
}

export async function updatePassword(resetToken, newPassword) {
    // check if reset token matches and is not expired -- 1 hour?
    // query supabase password update for username
    return true
}