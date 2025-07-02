import { joinURL, withQuery } from "ufo";

export default defineEventHandler(async (event) => {

    const proxyURL = useRuntimeConfig().nodeUrl;
    const path = event.path.replace("/api/", "/api/v1/");

    const target = joinURL(proxyURL, path) 
    return proxyRequest(event, target)
});