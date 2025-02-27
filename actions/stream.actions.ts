"use server"

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) {
        throw new Error('User is not logged in')
    }

    if (!apiKey) {
        throw new Error('No API key found')
    }

    if (!apiSecret) {
        throw new Error('No API secret found')
    }

    const client = new StreamClient(apiKey, apiSecret);

    // now we can create users/user token

    // exp is optional (by default the token is valid for an hour)
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    // when the token was issued
    const issued = Math.floor(Date.now() / 1000) - 60;

    // new token
    const token = client.createToken(user.id, exp, issued);

    return token;
}