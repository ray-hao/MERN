import React from 'react'
import { useHistory } from 'react-router'

const Delete = ({ id }) => {

    const history = useHistory();

    const deleteTodo = () => {
        fetch(`/api/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        })
        .then(res => res.json())
        .then(data => {
            history.push('/')
            console.log(data)
        })
    }

    return (
        <>
            <button onClick={deleteTodo}>Delete</button>
        </>
    )
}

export default Delete
