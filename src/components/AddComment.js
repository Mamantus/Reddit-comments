import React from 'react';
import { useState, useEffect } from 'react';

//På sidan skall också följande vara möjligt:

// Skriva ny kommentar på inlägget

// Ni skall anroppa API:et för att lägga till nya kommentarer (se endpoint)

// Tänk på att API:et inte faktiskt ändrar kommentar-databasen så ni måste hantera det lokalt

// Reagera (ökar bara reactions antalet)
    
function CreateComment() {
    const [input, setInput] = useState([''])
    const [result, setResult] = useState([])
    const [posted, setPosted] = useState(false)
    const [comments, setComments] = useState([])

    const handleSubmit = (e) => { 
        e.preventDefault();
        setPosted(true)
        setResult(input);  
    };

    const handleCommentChange = (event) => {
        const value = event.target.value
        setInput(value);
    }

    useEffect (() => {
        getAllComments().then(setInput);
    }, []);
    

    const getAllComments = async (input) => {
        let res = await fetch('https://dummyjson.com/comments/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                body: input,
                // text: input  
            })
        })
            .then((res) => res.json())
            .then((comment) => {
            setComments([...comments, comment]);
        });
            
        // const data = await res.json();
        // const commentArray = data.comments.map((comments) => comments);
        // console.log(...commentArray)
    }

return (
    <>
        <form className='commentForm' onSubmit={handleSubmit} >
            <h3>Write something useful or nice</h3>
            <input 
                // key={index}
                type="text" 
                name="comments" 
                value={input}
                onChange={handleCommentChange}
            /> 
            <button type='submit'>Send</button>       
        </form>

        {posted && (
            <>  
                <h4>User [...] wrote:</h4>
                <div className='postedComment'>{result}</div>
                <h5>Date posted: ...</h5>
            </>
        )}
    </> 
)
}

export default CreateComment;