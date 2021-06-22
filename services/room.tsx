import { getRequest, postRequest } from './common'

export interface Room {
  id: string,
  roomname: string,
  tag: string,
  number: string,
  description: string,
}

export class RoomCreate {
  // REF: singleton pettern: https://typescript-jp.gitbook.io/deep-dive/main-1/singleton
  private static _instance: RoomCreate
  static getInstance(): RoomCreate {
    if (!RoomCreate._instance) {
      RoomCreate._instance = new RoomCreate()
    }
    return RoomCreate._instance
  }

  public async getSelf(): Promise<any> {
    return getRequest("/account")
  }

  public async getAll(): Promise<any> {
    return getRequest("/users")
  }

  public async create(room: Room): Promise<any> {
    const newRoom = {
      roomname: room.roomname,
      tag: room.tag,
      number: room.number,
      description: room.description
    }
    return postRequest("/account", newRoom)
  }
}
