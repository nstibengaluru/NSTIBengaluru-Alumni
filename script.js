document.addEventListener('DOMContentLoaded', function() {
    const alumniForm = document.getElementById('alumniForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    alumniForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            batch: document.getElementById('batch').value,
            course: document.getElementById('course').value,
            currentJob: document.getElementById('currentJob').value,
            company: document.getElementById('company').value,
            linkedin: document.getElementById('linkedin').value,
            newsletter: document.getElementById('newsletter').checked ? 'Yes' : 'No',
            timestamp: new Date().toISOString()
        };

        // Send data to Google Sheets
        submitToGoogleSheets(formData);
    });

    function submitToGoogleSheets(data) {
        // Replace with your Google Apps Script Web App URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyK1sn84JQ65lO16Ctg7b1TK4m-WVy-bxZ3QJU35oGO0st7_v37FgoKdnU7ReMBUv2glw/exec';
        
        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showSuccess();
                alumniForm.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError();
        });
    }

    function showSuccess() {
        formSuccess.classList.remove('d-none');
        formError.classList.add('d-none');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.add('d-none');
        }, 5000);
    }

    function showError() {
        formError.classList.remove('d-none');
        formSuccess.classList.add('d-none');
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            formError.classList.add('d-none');
        }, 5000);
    }
});
