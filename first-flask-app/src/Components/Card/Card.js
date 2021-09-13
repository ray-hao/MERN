import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({data}) => {
    return (
        <div>
            <ul>
                {data.map(todo => {
                    return (
                    <li key={todo.id}>
                        <Link to={`${todo.id}`}>
                            {todo.content}
                        </Link>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Card
