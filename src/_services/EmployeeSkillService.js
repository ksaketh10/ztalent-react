import Axios from "axios";

export function getAllEmployees(){
    return Axios("http://localhost:8080/api/getAllEmployees")
        .catch((error) => {
            alert("error "+JSON.stringify(error));
        });
}