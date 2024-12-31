import { PrismaClient } from "@prisma/client";
import { error, log } from "node:console";

const prisma = new PrismaClient();

export async function getAllUsers(req, res) {
  try {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
export async function creatUser(req, res) {
  res.sendStatus(200);
}
export async function delletUser(req, res) {
  const { id } = req.params;

  console.log(`hello from user dellet:${id}`);

  res.sendStatus(200);
}

module.exports = { getAllUsers, creatUser, delletUser };
