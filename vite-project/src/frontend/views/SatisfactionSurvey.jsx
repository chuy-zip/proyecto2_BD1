import { useState } from 'react';
import { addSurveyToWaiter } from '../../controller/dashController';

function SatisfactionSurvey() {
    const [waiterId, setWaiterId] = useState('');
    const [friendlinessRating, setFriendlinessRating] = useState('');
    const [accuracyRating, setAccuracyRating] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Check if all fields are filled
        if (waiterId.trim() === '' || friendlinessRating === '' || accuracyRating === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        console.log('Waiter ID:', waiterId);
        console.log('Friendliness Rating:', friendlinessRating);
        console.log('Accuracy Rating:', accuracyRating);

        // Submit survey data
        await addSurveyToWaiter(waiterId, friendlinessRating, accuracyRating);
    };

    return (
        <div style={{width:'70%', height: '100%'}} className="order">
            <h1 className='viewTittle' 
                style={{textAlign:'center', paddingLeft:'30px', paddingTop:'30px', color:'black'}}>Encuesta de satisfacción</h1>
            
            <form>
                <h2 className='viewTittle2' style={{color:'black'}}>ID Mesero:</h2>
                <label>
                    <input 
                        type="text" 
                        value={waiterId} 
                        onChange={(e) => setWaiterId(e.target.value)} 
                        style={{textAlign:'center', width:'50%', color:'black'}} />
                </label>
                
                <h2 className='viewTittle2' style={{color:'black'}}>Calificación de Amabilidad (Siendo 1 bajo y 5 alto):</h2>
                <label>
                    <br />
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} style={{ display: 'inline-block' }}>
                            <input 
                                type="radio" 
                                name="friendliness" 
                                value={rating} 
                                onChange={(e) => setFriendlinessRating(e.target.value)}/>
                            <div style={{paddingLeft:'20px', color:'black'}}>{rating}</div>
                        </label>
                    ))}
                </label>
                <br />

                <h2 className='viewTittle2' style={{color:'black'}}>Precisión con el pedido (Siendo 1 bajo y 5 alto):</h2>
                <label>                    
                    <br />
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} style={{ display: 'inline-block' }}>
                            <input 
                                type="radio" 
                                name="accuracy" 
                                value={rating} 
                                onChange={(e) => setAccuracyRating(e.target.value)}/>
                            <div style={{paddingLeft:'20px', color:'black'}}>{rating}</div>
                        </label>
                    ))}
                </label>
                
            </form>

            <button 
                className="orderCompleteButton"
                style={{width:'40%', marginBottom:'30px'}}
                type="submit" 
                onClick={handleSubmit}>Enviar</button>
        </div>
    );
}

export default SatisfactionSurvey;
