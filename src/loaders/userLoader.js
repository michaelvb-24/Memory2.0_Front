import { getCurrentuser } from "../apis/auth";

export async function userLoader() {
	console.log("test1");
	return getCurrentuser();
}
