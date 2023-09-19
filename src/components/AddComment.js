import React from 'react';
import { useState, useEffect } from 'react';

//På sidan skall också följande vara möjligt:

// Skriva ny kommentar på inlägget

// Ni skall anroppa API:et för att lägga till nya kommentarer (se endpoint)

// Tänk på att API:et inte faktiskt ändrar kommentar-databasen så ni måste hantera det lokalt

// Reagera (ökar bara reactions antalet)


function CreateComment() {
    const [input, setInput] = useState('');
    //hardcoded posted to "true"
    const [posted, setPosted] = useState(true)
    const [comments, setComments] = useState([])

    //get all comments and store data in comments-state
    useEffect(() => {
        fetch("https://dummyjson.com/comments")
            .then((res) => res.json())
            //store data from fetch in comments-state
            .then((res) => setComments(res.comments));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        addComment(input)
        //clear inputfields
        setInput("")
    };
    //function to add comment and post it to server, input parameter with data from inputfield
    const addComment = async (input) => {
        const res = await fetch("https://dummyjson.com/comments/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            body: input, 
            //temporary hardcoded userid & postid since its required by the server
            userId: 1,
            postId: 1
        }),
        })
        .then((res) => res.json())
        //add the data to comment-state
        .then((comment) => {
            setComments([...comments, comment]);
        });
    };
    console.log(comments)
    return (
        <>
            <form className='commentForm' onSubmit={handleSubmit} >
                <h3>Write something useful or nice</h3>
                <input 
                    // key={index}
                    type="text" 
                    name="comments" 
                    value={input} onChange={(event) => setInput(event.target.value)} 
                /> 
                <button type='submit'>Send</button>       
            </form>
            {/* display current input not sure if needed */}
            <p>Comment: {input}</p>
            {/* if posted is set to true  */}
            {posted && (
                // map through comments object and pass in data to commentlist
                //{...comment} uses a "spread-operator" and will allow us to use the key-value pairs in comments
                //ex: id, body, postid is keys used in comments
                //then we can use these keys in Commentlis
                comments.map(comment => <CommentList key={comment.id} {...comment} />)
            )}
        </> 
    )
}

export default CreateComment;
//commentlist, responsible for rendering out each comment 
//parameters passed in by mapping comments 
const CommentList = ({ body, postId }) => (
    <div>
        <ul>
        <li>postId: {postId}</li>
        <li>Comment: {body}</li>
        </ul>
    </div>
);