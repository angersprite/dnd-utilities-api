import { createClient } from '@supabase/supabase-js'
import {} from 'dotenv/config'
import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'

// replace with secure key
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

export async function registerUser(email, userName, password) {
    let hashedPW = await bcrypt.hash(password, 10)
    const { data, error } = await supabase
        .rpc('register_user', {
            email, hashedPW, userName
        })
    // send confirmation email

    return true
}

export async function tryLogin(userName, password) {
    // salt and has password and see if it matches for userName
    return true
}

export async function getUserProfile(userID) {
    // query supabase for user's info and return it
    return true
}

export async function resetPasswordEmail(userName) {
    // query supabase for matching username
    // update supabase with reset token and timestamp
    // send password reset email to user with link to reset page + reset token

    return true
}

export async function updatePassword(resetToken) {
    // check if reset token matches and is not expired -- 1 hour?
    // query supabase password update for username
    return true
}