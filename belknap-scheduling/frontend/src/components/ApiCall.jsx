const defaultError = (e) => {
    console.log(e);
};
export const ApiCall = async (
    method,
    page,
    body = undefined,
    errorCallback = defaultError
) => {
    try {
        console.log(body)
        const payload = {
            method: method,
            headers: {
                "Content-type": "application/json",
            },

            body: body === undefined ? undefined : JSON.stringify(body),
        };
        const path = `http://localhost:${5000}/${page}`;
        const response = await fetch(path, payload);
        if (response.status === "403") {
            localStorage.removeItem("token");
        }
        if (!response.ok) {
            const errStatus = await response.status;
            throw new Error(errStatus);
        }
        return response.json();
    } catch (e) {
        errorCallback(e.message);
    }
};
