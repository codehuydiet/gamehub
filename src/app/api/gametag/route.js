import { games, gametag, tags } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        connectToDb();
        const gametags = await gametag.find();
        // console.log(game);
        // console.log('asdasd');
        return NextResponse.json(gametags);
    } catch (err) {
        console.log(err);
        throw new Error("lỗi");
    }
}
