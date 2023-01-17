import axios from "axios";
import hardware from "../../../hardware";

let defaultMsg = "request from inneros";

export enum HTTPMethod {
    get = "get",
    post = "post",
    put = "put",
    delete = "delete",
    patch = "patch"
}

export class Network {
    public async httpRequest(method: HTTPMethod, url: string, data?: any) {
        hardware.Memory.allocate(0xf1, url.length);
        let response;
        
        switch (method) {
            case HTTPMethod.get:
                response = await axios.get(url);
                break;
            case HTTPMethod.post:
                response = await axios.post(url, data || defaultMsg);
                break;
            case HTTPMethod.patch:
                response = await axios.patch(url, data || defaultMsg);
                break;
            case HTTPMethod.put:
                response = await axios.put(url, data || defaultMsg);
                break;
            case HTTPMethod.delete:
                response = await axios.delete(url);
                break;
        }

        hardware.Memory.deallocate(0xf1, url.length);
        return response;
    }
}