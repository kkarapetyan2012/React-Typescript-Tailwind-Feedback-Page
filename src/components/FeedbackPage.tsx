import { useState, FC, ChangeEvent } from 'react';
import Inputs from '../ui-elements/Inputs';
import Button from '../ui-elements/Buttons';
import ErrorMessage from '../ui-elements/ErrorMessage';
import SuccessMessage from '../ui-elements/SuccessMessage';

// also we can add type folder and file and our type write there

interface FormData {
    username: string;
    email: string;
    subject: string;
    message: string;
    [key: string]: string; // Index signature
}

interface TouchedState {
    [key: string]: boolean;
}

interface ErrorsState {
    [key: string]: string | null;
}

interface NewErrors {
    [key: string]: string;
}

const FeedbackPage: FC = () => {

    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<ErrorsState>({});
    const [touched, setTouched] = useState<TouchedState>({}); // Track which fields were touched
    const [showSuccess, setShowSuccess] = useState<boolean>(false);  // State to control success message visibility

    const handleChange = (e: (ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (touched[name]) {
            validateField(name, value);
        }
    };

    const validateField = (name: string, value: string) => {
        let errorMsg = null;
        if (value.trim() === '') {
            errorMsg = `${name[0].toUpperCase() + name.slice(1)} is required.`;
        } else if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMsg = 'Please enter a valid email address.';
        }

        setErrors((prev) => ({
            ...prev,
            [name]: errorMsg
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTouched = { username: true, email: true, subject: true, message: true };
        setTouched(newTouched);
        
        let isValid = true;
        const newErrors: NewErrors = {};
    
        ['username', 'email', 'subject', 'message'].forEach(field => {
           
            // Loop through each field to perform validation checks
            if (!formData[field].trim()) {
                // If the field is empty (after trimming whitespace), set an error message for this field
                newErrors[field] = `${field[0].toUpperCase() + field.slice(1)} is required.`;
                isValid = false; // Set the isValid flag to false indicating there is at least one validation error
            } else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field])) {
                // If the field is 'email' and the value does not match the email regex, set an error message
                newErrors[field] = 'Please enter a valid email address.';
                isValid = false; // Set the isValid flag to false indicating there is at least one validation error
            }
        });
    
        setErrors(newErrors);
    
        if (isValid) {
            setShowSuccess(true);  // Show success message
            setTimeout(() => setShowSuccess(false), 3000);  // Hide success message after 3 seconds
            setFormData({ username: '', email: '', subject: '', message: '' });  // Reset form data only if form is valid
        }
    };
    
    return (
        <div className='w-full max-w-[480px] m-auto p-5 '>
            <div className='border rounded-md border-[#ccc] p-5'>
                <h1 className='text-dark-green mb-5 text-xl md:text-2xl font-bold text-center'>Feedback Form</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <div className='mb-4'>
                        <Inputs
                            type="text"
                            label="Username"
                            name="username"
                            value={formData.username}
                            handleChange={handleChange}
                        />
                        <ErrorMessage error={errors.username} />
                    </div>
                    <div className="mb-4">
                        <Inputs
                            type="email"
                            label="Email"
                            name="email"
                            value={formData.email}
                            handleChange={handleChange}
                        />
                        <ErrorMessage error={errors.email} />
                    </div>
                    <div className="mb-4">
                        <Inputs
                            type="text"
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            handleChange={handleChange}
                        />
                        <ErrorMessage error={errors.subject} />
                    </div>
                    <div className="mb-4">
                        <Inputs
                            textarea
                            label="Message"
                            name="message"
                            value={formData.message}
                            handleChange={handleChange}
                        />
                        <ErrorMessage error={errors.message} />
                    </div>
                    

                    <Button type="submit" variant="primary">Submit</Button>
                </form>

                <SuccessMessage show={showSuccess}>
                    Your message has been sent!
                </SuccessMessage>
            </div>
        </div>
    );
};

export default FeedbackPage;