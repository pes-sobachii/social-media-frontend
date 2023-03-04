export interface IRegisterUser {
	name: string
	surname: string
	email: string
	status: string
	password?: string
	profession: string
	age: Number
	gender: string
	avatar: string
	city: string
}

type IUserParent = Omit<IRegisterUser, 'password'>

export interface IUnauthUser extends IUserParent {
	_id: string
	followings: IUnauthUser[]
	followers: IUnauthUser[]
}

export interface IAuthUser extends IUnauthUser {
	token: string
}

export interface ILogin {
	email: string
	password: string
}
