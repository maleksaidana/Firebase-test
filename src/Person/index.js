import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

const Person = ({item}) => {

    const [days, hours, minutes, seconds] = useCountdown(new Date(new Date(item?.createdAt.toDate()).getTime() + (1000 * 60 * 30)));



    return (

        <div className="card">
            <h2>{item.name}</h2>
            <p>{item.age}</p>
            <p>{item?.createdAt.toDate().toLocaleString()}</p>
            <p> EXPIRES IN: {minutes}:{seconds} </p>
            <img alt="not Found" width={100} height={100} src={item.imgUrl} />
            <p  hidden> {days + hours}</p>

        </div>

    );

};

export default Person;