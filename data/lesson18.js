async function function1() {
    try { 
        const response = await fetch('https://supersimplebackend.dev/greeting', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
        });
    
        if (response.status >= 400) {
            throw response;
        };

        console.log(await response.text());
    } catch(error) {
        if (error.status === 400) {
            console.log(await error.json());
        } else {
            console.log('Network error');
        };
    };
};
function1();