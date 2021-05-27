import { getRequest, postRequest } from './common'

export interface Room {
  id: string,
  roomname: string,
  tag: string,
  number: string,
  description: string,
}

export interface Tag {
  id: string,
  newTags: 
  tags: string,
}

export class UserService {
  // REF: singleton pettern: https://typescript-jp.gitbook.io/deep-dive/main-1/singleton
  private static _instance: UserService
  static getInstance(): UserService {
    if (!UserService._instance) {
      UserService._instance = new UserService()
    }
    return UserService._instance
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
