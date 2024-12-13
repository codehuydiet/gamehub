"use server"

import { revalidatePath, unstable_noStore } from "next/cache";
import { signIn, signOut } from "./auth";
import { avatar, cover, games, gametag, like, recent, tags, users } from "./models";
import { connectToDb } from "./utils";
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

let visible = true;

export const Visible = () => {
    // console.log(visible);
    return visible;
}

export const isNavbarOn = async () => {
    visible = !visible
    // console.log(visible);
}

export const register = async (prevState, formData) => {
    const { userName, password, passwordRepeat, email, nation } = Object.fromEntries(formData);
    console.log(userName, password, passwordRepeat, email, nation);
    if (!userName || !password || !passwordRepeat || !email || !nation) {
        return { error1: "All fields are required!" };
    }

    if (password !== passwordRepeat) {

        return { error2: "Passwords do not match!" };
    }

    if (/\s/.test(userName)) {
        return { error5: "username cannot contain spaces." };
    }
    if (/\s/.test(password)) {
        return { error6: "password cannot contain spaces." };
    }
    if (/\s/.test(email)) {
        return { error7: "Email cannot contain spaces." };
    }
    if (/[^a-zA-Z0-9]/.test(userName)) {
        return { error8: "Username cannot contain special characters." };
    }

    try {
        connectToDb();
        const usermail = await users.findOne({ email: email });
        const username = await users.findOne({ userName: userName });
        if (username?.userName === userName) {
            console.log(1);
            return { error3: "Username is already in use!" };
        }
        if (usermail?.email === email) {
            console.log(1);
            return { error4: "This email is already registered!" };
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = users({
            userName: userName,
            password: hashPassword,
            email: email,
            nation: nation,
        });
        console.log(newUser);
        await newUser.save();
        console.log(1);
        return { success: true };
    } catch (error) {
        console.error("Registration error:", error.message);
        throw new Error("Registration error!");
    }
};


export const handleGooglLogin = async () => {
    await signIn("google");
}

export const handlegithubLogin = async () => {
    await signIn("github");
}

export const handleLogout = async () => {
    await signOut();
    redirect("/");
}

export const login = async (prevState, formData) => {
    const { EmailOrUserName, password } = Object.fromEntries(formData);
    if (!EmailOrUserName && !password) {
        return { error1: "Email or username and password cannot be empty." };
    }
    if (!EmailOrUserName || EmailOrUserName == ' ') {
        return { error2: "Email or username cannot be empty." };
    }
    if (!password || password == ' ') {
        return { error3: "Password cannot be empty." };
    }
    if (/\s/.test(EmailOrUserName)) {
        return { error4: "Email or username cannot contain spaces." };
    }
    if (/\s/.test(password)) {
        return { error5: "password cannot contain spaces." };
    }
    if (EmailOrUserName.length > 10) {
        return { error6: "Email or username cannot exceed 10 characters." };
    }
    if (password.length > 15) {
        return { error7: "password cannot exceed 15 characters." };
    }
    try {
        const result = await signIn("credentials", { redirect: true, EmailOrUserName, password });
        console.log(result);
    } catch (err) {
        // console.log(err);
        // console.log(err.message);
        if (err.message.includes("credentialssignin")) {
            // console.log(1);
            return { error: "Invalid username or password" };
        }
        throw err;
    }
};

export const findUser = async (email) => {
    // console.log(EmailOrUserName, password);
    // console.log(email);
    try {
        const result = await users.findOne({ email: email });
        // console.log(result);
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const deleteUser = async (formData) => {
    // console.log("form data: ", formData);
    const id = formData.get('action');
    try {
        connectToDb();
        await recent.deleteMany({ idUser: id });
        await users.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
}

export const deleteGame = async (formData) => {
    // console.log("form data: ", formData);
    const id = formData.get('action');
    try {
        connectToDb();
        await like.deleteMany({ idGame: id });
        await recent.deleteMany({ idGame: id });
        await gametag.deleteMany({ idGame: id });
        await games.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
}

export const deleteTag = async (formData) => {
    // console.log("form data: ", formData);
    const id = formData.get('action');
    try {
        connectToDb();
        await gametag.deleteMany({ idGame: id });
        await tags.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
}

export const deleteAvatar = async (formData) => {
    // console.log("form data: ", formData);
    const id = formData.get('action');
    try {
        connectToDb();
        await avatar.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
}

export const deleteCover = async (formData) => {
    // console.log("form data: ", formData);
    const id = formData.get('action');
    try {
        connectToDb();
        await cover.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
}

export const createUser = async (prevState, formData) => {
    "use server";
    const { userName, email, password, nation, isAdmin } = Object.fromEntries(formData);
    console.log(userName, email, password, nation, isAdmin);
    if (!userName || !password || !isAdmin || !email || !nation) {
        console.log(1);
        return { error1: "All fields are required!" };
    }
    try {
        connectToDb();
        const usermail = await users.findOne({ email: email });
        const username = await users.findOne({ userName: userName });
        if (username?.userName === userName) {
            console.log(1);
            return { error3: "Username is already in use!" };
        }
        if (usermail?.email === email) {
            console.log(1);
            return { error4: "This email is already registered!" };
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = users({
            userName: userName,
            password: hashPassword,
            email: email,
            nation: nation,
            isAdmin: isAdmin,
        });
        // console.log(newUser);
        await newUser.save();
        revalidatePath("/admin");
        return { success: true };
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
}

export const createTag = async (formData) => {
    const { image, path, tagName } = Object.fromEntries(formData);
    console.log(image, path, tagName);
    try {
        connectToDb();
        const tagPath = await tags.findOne({ path: path });
        const tagImg = await tags.findOne({ image: image });
        const TagName = await tags.findOne({ tagName: tagName });
        if (tagPath) {
            console.log("path is already in use!");
            return;
        }
        if (tagImg) {
            console.log("img is already in use!");
            return;
        }
        if (TagName) {
            console.log("tag name is already in use!");
            return;
        }
        const newTag = tags({
            tagName: tagName,
            path: path,
            image: image,
        });
        // console.log(newTag);
        await newTag.save();
        revalidatePath("/admin");
        return { success: true };
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
}

export const createGame = async (prevState, formData) => {
    const { name, embed, technology, platforms, img, path } = Object.fromEntries(formData);
    console.log(name, embed, technology, platforms, img, path);

    if (/[^a-zA-Z0-9]/.test(name)) {
        return { error1: "Game name cannot contain special characters." };
    }

    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

    if (!urlRegex.test(embed)) {
        return { error2: "Embed must be a valid URL." };
    }

    if (!urlRegex.test(img)) {
        return { error3: "Image must be a valid URL." };
    }

    if (path.includes(" ")) {
        return { error4: "Path cannot contain spaces." };
    }
    console.log(1);
    try {
        console.log(1);
        connectToDb();
        console.log(2);

        const path1 = "/game/" + path;
        const gameName = await games.findOne({ name: name });
        const gameEmbed = await games.findOne({ embed: embed });
        const gameImg = await games.findOne({ img: img });
        const gamePath = await games.findOne({ path: path1 });
        console.log(1);

        if (gamePath) {
            console.log("Path is already in use!");
            console.log(1);
            return { error5: "Path is already in use." };
        }
        if (gameImg) {
            console.log(1);
            console.log("Image is already in use!");
            return { error6: "Image is already in use." };
        }
        if (gameName) {
            console.log(1);
            console.log("Game name is already in use!");
            return { error7: "Game name is already in use." };
        }
        if (gameEmbed) {
            console.log(1);
            console.log("Embed is already in use!");
            return { error8: "Embed is already in use." };
        }
        console.log(3);

        const newGame = games({
            name: name,
            embed: embed,
            technology: technology,
            platforms: platforms,
            img: img,
            path: path1,
        });
        console.log(newGame);
        await newGame.save();
        revalidatePath("/admin");
        return { success: true };
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};



export const createAvatar = async (formData) => {
    const { img } = Object.fromEntries(formData);
    console.log(img);
    try {
        connectToDb();
        const avatarImg = await avatar.findOne({ img: img });
        if (avatarImg) {
            console.log("img is already in use!");
            return;
        }
        const newAvatar = avatar({
            img: img,
        });
        console.log(newAvatar);
        await newAvatar.save();
        revalidatePath("/admin");
        return { success: true };
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
}

export const createCover = async (formData) => {
    const { img } = Object.fromEntries(formData);
    console.log(img);
    try {
        connectToDb();
        const coverImg = await cover.findOne({ img: img });
        if (coverImg) {
            console.log("img is already in use!");
            return;
        }
        const newCover = cover({
            img: img,
        });
        console.log(newCover);
        await newCover.save();
        revalidatePath("/admin");
        return { success: true };
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
}

export const getUser = async (email) => {
    // console.log(email);
    if (email) {
        try {
            connectToDb();
            const tag = await users.findOne({ email: email });
            // console.log(tag.id);
            return tag;
        } catch (err) {
            console.log(err);
            throw new Error("Failed to fetch user!");
        }
    }
    return;
};

export const getAvatar = async (id) => {
    // console.log(email);
    try {
        connectToDb();
        const Avatar = await avatar.findById(id);
        // console.log(Avatar.img);
        return Avatar.img;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch user!");
    }
};

export const getCover = async (id) => {
    // console.log(email);
    try {
        connectToDb();
        const Cover = await cover.findById(id);
        // console.log(Cover.img);
        return Cover.img;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch user!");
    }
};

export const recentPlayed = async (slug, idUser) => {
    // console.log(slug);
    // console.log(idUser);
    if (idUser) {
        slug = "/game/" + slug;
        // console.log(slug);
        try {
            connectToDb();
            const game = await games.findOne({ path: slug });
            // console.log(game.id);
            const user = await users.findById(idUser);
            // console.log(user.id);
            const update = {
                $inc: { NPlayed: 1 },
            };
            const options = {
                new: true,
                upsert: true,
            };
            const updatedRecent = await recent.findOneAndUpdate(
                { idUser: user.id, idGame: game.id },
                update,
                options
            );
            // console.log(updatedRecent);
        } catch (err) {
            console.log(err);
            throw new Error("lỗi kết nối rồi bé ơi đây là trong api/tag/router");
        }
    }
    return;
}

export const gameLike = async (idU, idGame) => {
    console.log(idGame);
    console.log(idU);
    const gameSlug = await games.findById(idGame);
    if (idGame && idU) {
        try {
            connectToDb();
            const Like = await like.findOne({ idUser: idU, idGame: idGame });
            console.log(Like);
            let update = {};
            if (Like) {
                if (Like.isDisLike === true && Like.isLike === false) {
                    console.log(1);
                    const updatedGameLike = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { like: 1 },
                        },
                    );
                    const updatedGameDisLike = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { dislike: -1 },
                        },
                    );
                    update = {
                        isLike: true,
                        isDisLike: false
                    };
                } else if (Like.isDisLike === true && Like.isLike === true) {
                    console.log(1);
                    const updatedGame = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { dislike: -1 },
                        },
                    );
                    update = {
                        isDisLike: false,
                    };
                    return;
                } else if (Like.isDisLike === false && Like.isLike === true) {
                    console.log(1);
                    const updatedGame = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { like: -1 },
                        },
                    );
                    update = {
                        isLike: false,
                    };
                    console.log(1);
                } else if (Like.isDisLike === false && Like.isLike === false) {
                    console.log(1);
                    const updatedGame = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { like: 1 },
                        },
                    );
                    update = {
                        isLike: true,
                    };
                }
            } else {
                console.log(1);
                const updatedGame = await games.findOneAndUpdate(
                    { _id: idGame },
                    update = {
                        $inc: { like: 1 },
                    },
                );
                update = {
                    isLike: true,
                };
            }
            const options = {
                new: true,
                upsert: true,
            };
            console.log(1);
            const updatedLike = await like.findOneAndUpdate(
                { idUser: idU, idGame: idGame },
                update,
                options,
            );
            console.log(gameSlug.path);
            revalidatePath(gameSlug.path);
        } catch (err) {
            console.log(err);
            throw new Error("Failed to fetch user!");
        }
    }
}

export const gameDisLike = async (idU, idGame) => {
    console.log(idGame);
    console.log(idU);
    const gameSlug = await games.findById(idGame);
    if (idGame && idU) {
        try {
            connectToDb();
            const Like = await like.findOne({ idUser: idU, idGame: idGame });
            console.log(Like);
            let update = {};
            if (Like) {
                if (Like.isDisLike === false && Like.isLike === true) {
                    console.log(1);
                    const updatedGameLike = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { like: -1 }
                        },
                    );
                    const updatedGameDisLike = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { dislike: 1 },
                        },
                    );
                    update = {
                        isLike: false,
                        isDisLike: true
                    };
                } else if (Like.isDisLike === true && Like.isLike === true) {
                    console.log(1);
                    const updatedGame = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { like: -1 },
                        },
                    );
                    update = {
                        isLike: false,
                    };
                } else if (Like.isDisLike === true && Like.isLike === false) {
                    console.log(1);
                    const updatedGame = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { dislike: -1 },
                        },
                    );
                    update = {
                        isDisLike: false,
                    };
                } else if (Like.isDisLike === false && Like.isLike === false) {
                    console.log(1);
                    const updatedGame = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { dislike: 1 },
                        },
                    );
                    update = {
                        isDisLike: true,
                    };
                }
            } else {
                console.log(1);
                const updatedGame = await games.findOneAndUpdate(
                    { _id: idGame },
                    update = {
                        $inc: { like: 1 },
                    },
                );
                update = {
                    isLike: true,
                };
            }
            const options = {
                new: true,
                upsert: true,
            };
            console.log(1);
            console.log(update);
            const updatedLike = await like.findOneAndUpdate(
                { idUser: idU, idGame: idGame },
                update,
                options,
            );
            console.log(gameSlug.path);
            revalidatePath(gameSlug.path);
        } catch (err) {
            console.log(err);
            throw new Error("Failed to fetch user!");
        }
    }
}

export const gameFavorite = async (idU, idGame) => {
    console.log(idGame);
    console.log(idU);
    const gameSlug = await games.findById(idGame);
    if (idGame && idU) {
        try {
            connectToDb();
            const Like = await like.findOne({ idUser: idU, idGame: idGame });
            console.log(Like);
            let update = {};
            if (Like) {
                if (Like.isDisLike === true) {
                    console.log(1);
                    const updatedGameLike = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { like: -1 }
                        },
                    );
                    const updatedGameDisLike = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { dislike: 1 },
                        },
                    );
                    update = {
                        isLike: false,
                        isDisLike: true
                    };
                } else {
                    console.log(1);
                    const updatedGame = await games.findOneAndUpdate(
                        { _id: idGame },
                        update = {
                            $inc: { like: -1 },
                        },
                    );
                    update = {
                        isLike: false,
                    };
                }
            } else {
                console.log(1);
                const updatedGame = await games.findOneAndUpdate(
                    { _id: idGame },
                    update = {
                        $inc: { like: 1 },
                    },
                );
                update = {
                    isLike: true,
                };
            }
            const options = {
                new: true,
                upsert: true,
            };
            console.log(1);
            // console.log(update);
            const updatedLike = await like.findOneAndUpdate(
                { idUser: idU, idGame: idGame },
                update,
                options,
            );
            // console.log(gameSlug.path);
            revalidatePath(gameSlug.path);
        } catch (err) {
            console.log(err);
            throw new Error("Failed to fetch user!");
        }
    }
}

export const getGame = async (query) => {
    try {
        connectToDb();
        const allgames = await games.find({ name: { $regex: `${query}`, $options: 'i' } });
        return allgames;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch all games!");
    }
};

export const getGames = async () => {
    try {
        connectToDb();
        const result = await games.find();
        return result;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch all games!");
    }
};
