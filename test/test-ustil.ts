import { Address, Contact, User } from "@prisma/client";
import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "test",
        password: await bcrypt.hash("test", 10),
        name: "test",
        token: "test",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: { username: "test" },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    return user;
  }
}

export class ContactTest {
  static async deleteAll() {
    await prismaClient.contact.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.contact.create({
      data: {
        first_name: "test",
        last_name: "test",
        email: "test@gmail.com",
        phone: "0987676789",
        username: "test",
      },
    });
  }

  static async get(): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: "test",
      },
    });

    if (!contact) {
      throw new Error("Contact Not Found");
    }

    return contact;
  }
}


export class AddressTest {
  static async deleteAll() {
    await prismaClient.address.deleteMany({
      where:{
        contact: {
          username: "test"
        }
      }
    })
  }
  static async create() {
    const contact = await ContactTest.get()
    await prismaClient.address.create({
      data: {
        contact_id: contact.id,
        street: "jalan",
        city: "surakarta",
        province: "jawa tengah",
        country: "indonesia",
        postal_code: "1234"
      }
    })
  }

  static async get(): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        contact: {
          username: "test"
        }
      }
    })
    if(!address){
      throw new Error("Address Not Found")
    }

    return address
  }
}

