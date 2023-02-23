export interface IUser {
  name: string;
  email: string;
}

const db: Array<IUser> = [
  {
    name: 'Jonatas',
    email: 'jonatas@gmail.com',
  },
];

export class UserService {
  public db: Array<IUser>;

  constructor(database = db) {
    this.db = database;
  }

  public createUser(name: string, email: string): void {
    const user: IUser = {
      name,
      email,
    };

    this.db.push(user);
    console.log('usuario criado');
  }

  public deleteUser(id: string): void {
    this.db = this.db.filter((user) => user.name !== id);
  }

  public setDb(db: Array<IUser>) {
    this.db = db;
  }

  public getUsers(): Array<IUser> {
    return this.db;
  }
}
