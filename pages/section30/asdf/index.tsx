import { getAccessToken } from "../../../src/commons/libaries/getAccessToken";

export default function A() {
    const aa = () => {
        const result = getAccessToken();
        console.log(result);
    };
    return (
        <>
            <button onClick={aa}>fffffffffff</button>
        </>
    );
}
