import Password from "../Helpers/Password";
import { User as _User } from "../Models/User";

export interface ILogin {
	email: string,
	password: string
}

export class User {

	public static async Login(login: ILogin): Promise<_User> {
		try {
			const exists = await _User.findOne({ email: login.email });
			if (!exists) throw "User not found";

			const match = await Password.Compare(login.password, exists.password);
			if (!match) throw "incorrect password";

			return exists;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Register(register: ILogin): Promise<_User> {
		try {
			const exists = await _User.findOne({ email: register.email });
			if (exists) throw "email taken";

			const newUser = new _User();
			newUser.email = register.email;
			newUser.password = await Password.Hash(register.password);

			return newUser.save();
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async FindOneById(id: number): Promise<_User> {
		try {
			const exists = await _User.findOne({ id });
			if (!exists) throw "User not found";

			return exists;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async IncrementToken(id: number): Promise<boolean> {
		try {
			const user = await _User.findOne({ id });
			if (!user) throw "user not found";

			user.tokenVersion += 1;
			await user.save();

			return true;
		} catch (error) {
			throw Error(error);
		}
	}
}