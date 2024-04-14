async function addSurveyToWaiter(waiterId, amabilidad, exactitud) {
    const data = {
        amabilidad,
        exactitud
    };

    try {
        const response = await fetch(`http://localhost:3000/waiter/${waiterId}/rating`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to add rating to waiter');
        }

        const responseData = await response.json();
        console.log(responseData); // Log the response data
        return responseData;
    } catch (error) {
        console.error('Error adding rating to waiter:', error);
        throw error; // Rethrow the error to handle it in the caller function
    }
}

export {addSurveyToWaiter}