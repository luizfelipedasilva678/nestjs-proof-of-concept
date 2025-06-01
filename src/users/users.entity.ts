class User {
  public id: number;
  public login: string;
  public name: string;
  public password: string;

  constructor(
    login: string = '',
    name: string = '',
    password: string = '',
    id: number = 0,
  ) {
    this.id = id;
    this.login = login;
    this.name = name;
    this.password = password;
  }
}

export default User;
