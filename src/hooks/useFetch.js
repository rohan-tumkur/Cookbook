import {useState, useEffect, useRef} from 'react';

export const useFetch = (url, method = "GET") => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null);

    const postData = (postData) => {
        console.log(postData);
        setOptions({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
        
    }
       
    
    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async (fetchOptions) => {
            setIsPending(true);
            console.log(fetchOptions);
            try {
                const res = await fetch(url, { ...fetchOptions, signal: controller.signal });
                if (!res.ok){
                    throw new Error(res.statusText);
                }
                const json = await res.json();
                setIsPending(false);
                setData(json);
                console.log(json);
                setError(null);
            } catch (e) {
                if(e.name === 'AbortError'){
                    console.log('the fetch was aborted');
                } else {
                    setIsPending(false);
                    setError('Could not fetch the data');
                    console.log(e.message);
                }
            }
           
        }
        if (method === "GET"){
            fetchData();
        }
        if (method === "POST" && options){
            fetchData(options);
        }

        return () => {
            controller.abort();
        }

    }, [url, method, options])

    return {data, isPending, error, postData};

}
