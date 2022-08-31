import { dbServiece } from "fbase";
import React, { useEffect, useState } from "react"

const Home = () => {
    // Variable
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])

    // Method
    const getNweets = async () => {
        const dbNweets = await dbServiece.collection("nweets").get();
        dbNweets.forEach(document => {
            const nweetObject = {
                ...document.data(),
                id: document.id
            }
            setNweets(prev => [nweetObject, ...prev])
        })
    }

    useEffect(() => {
        getNweets();
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        await dbServiece.collection("nweets").add({
            nweet,
            createdAt: Date.now()
        })
        setNweet("");
    }

    const onChange = (event) => {
        const { target: { value } } = event
        setNweet(value)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
};
export default Home;
