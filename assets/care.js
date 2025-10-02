       function toggleFAQ(index) {
            const answer = document.getElementById(`answer-${index}`);
            const icon = document.getElementById(`icon-${index}`);
            
            // Close all other FAQs
            for (let i = 0; i < 6; i++) {
                if (i !== index) {
                    document.getElementById(`answer-${i}`).classList.remove('active');
                    document.getElementById(`icon-${i}`).classList.remove('active');
                }
            }
            
            // Toggle current FAQ
            answer.classList.toggle('active');
            icon.classList.toggle('active');
        }

        function handleSubmit(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');
            
            // Reset form
            event.target.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
            
            // Log form data (in a real application, this would be sent to a server)
            console.log('Form submitted:', data);
        }

       