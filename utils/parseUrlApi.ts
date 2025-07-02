import {joinURL} from "ufo";

export default function (path: string){
    return joinURL("/api/proxy", path);
	} 