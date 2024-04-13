import { useState } from 'react';

function SatisfactionSurvey() {
    const [waiterId, setWaiterId] = useState('');
    const [friendlinessRating, setFriendlinessRating] = useState('');
    const [accuracyRating, setAccuracyRating] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle the submission of the survey data
        console.log('Waiter ID:', waiterId);
        console.log('Friendliness Rating:', friendlinessRating);
        console.log('Accuracy Rating:', accuracyRating);
    };

    return (
        <div>
            <h1 className='viewTittle'>Satisfaction Survey</h1>
            <form>
                <label>
                    Waiter ID:
                    <input type="text" value={waiterId} onChange={(e) => setWaiterId(e.target.value)} />
                </label>
                <h2 className='viewTittle2'>Friendliness Rating:</h2>
                <label>
                    
                    <br />
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} style={{ display: 'inline-block' }}>
                            <input 
                                type="radio" 
                                name="friendliness" 
                                value={rating} 
                                onChange={(e) => setFriendlinessRating(e.target.value)}/>
                                    <div style={{paddingLeft:'13px'}}>{rating}</div>
                        </label>
                    ))}
                </label>
                <br />

                <h2 className='viewTittle2'>Accuracy Rating:</h2>
                <label>                    
                    <br />
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} style={{ display: 'inline-block' }}>
                            <input 
                                type="radio" 
                                name="accuracy" 
                                value={rating} 
                                onChange={(e) => setAccuracyRating(e.target.value)}/>
                                    <div style={{paddingLeft:'13px'}}>{rating}</div>
                        </label>
                    ))}
                </label>
                
            </form>

            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default SatisfactionSurvey;
