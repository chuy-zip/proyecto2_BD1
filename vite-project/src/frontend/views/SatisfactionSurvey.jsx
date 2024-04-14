import { useState } from 'react';
import { addSurveyToWaiter } from '../../controller/dashController';


function SatisfactionSurvey() {
    const [waiterId, setWaiterId] = useState('');
    const [friendlinessRating, setFriendlinessRating] = useState('');
    const [accuracyRating, setAccuracyRating] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Waiter ID:', waiterId);
        console.log('Friendliness Rating:', friendlinessRating);
        console.log('Accuracy Rating:', accuracyRating);
        await addSurveyToWaiter(waiterId, friendlinessRating, accuracyRating)


    };

    return (
        <div>
            <h1 className='viewTittle' style={{textAlign:'center', paddingLeft:'30px'}}>Encuesta de satisfacción</h1>
            
            <form>
                

                <h2 className='viewTittle2'>ID Mesero:</h2>

                <label>
                
                    <input 
                        type="text" 
                        value={waiterId} 
                        onChange={(e) => setWaiterId(e.target.value)} 
                        style={{textAlign:'center'}}/>
                </label>
                <h2 className='viewTittle2'>Calificación de Amabilidad:</h2>
                <label>
                    
                    <br />
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} style={{ display: 'inline-block' }}>
                            <input 
                                type="radio" 
                                name="friendliness" 
                                value={rating} 
                                onChange={(e) => setFriendlinessRating(e.target.value)}/>
                                    <div style={{paddingLeft:'20px', color:'white'}}>{rating}</div>
                        </label>
                    ))}
                </label>
                <br />

                <h2 className='viewTittle2'>Precisión con el pedido:</h2>
                <label>                    
                    <br />
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} style={{ display: 'inline-block' }}>
                            <input 
                                type="radio" 
                                name="accuracy" 
                                value={rating} 
                                onChange={(e) => setAccuracyRating(e.target.value)}/>
                                    <div style={{paddingLeft:'20px', color:'white'}}>{rating}</div>
                        </label>
                    ))}
                </label>
                
            </form>

            <button 
                className="orderCompleteButton"
                style={{width:'40%', marginLeft:'23px'}}
                type="submit" 
                onClick={handleSubmit}>Enviar</button>
        </div>
    );
}

export default SatisfactionSurvey;
