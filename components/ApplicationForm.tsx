import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from './UI';
import { Upload, CheckCircle, AlertCircle, Loader2, X, Calendar, FileText, Check } from 'lucide-react';

interface FormData {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    passportNumber: string;
    passportExpiry: string;
    qualification: string;
    certifications: string;
    experience: string;
    subjects: string[];
    additionalNotes: string;
    consent: boolean;
}

interface FileData {
    name: string;
    type: string;
    size: number;
    base64: string;
}

interface FormFiles {
    cv: FileData | null;
    passportCopy: FileData | null;
    medical: FileData | null;
    additional: FileData | null;
}

const INITIAL_DATA: FormData = {
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    passportNumber: '',
    passportExpiry: '',
    qualification: '',
    certifications: '',
    experience: '',
    subjects: [],
    additionalNotes: '',
    consent: false
};

const SUBJECT_OPTIONS = [
    "English", "Mathematics", "Science (General)", "Physics", "Chemistry", "Biology",
    "History", "Geography", "Art & Design", "Music", "Physical Education",
    "Computer Science", "Business Studies", "Economics", "Primary / Elementary", "Kindergarten / EYFS"
];

const ApplicationForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
    const [files, setFiles] = useState<FormFiles>({
        cv: null,
        passportCopy: null,
        medical: null,
        additional: null
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubjectToggle = (subject: string) => {
        setFormData(prev => {
            const currentSubjects = prev.subjects;
            if (currentSubjects.includes(subject)) {
                return { ...prev, subjects: currentSubjects.filter(s => s !== subject) };
            } else {
                return { ...prev, subjects: [...currentSubjects, subject] };
            }
        });
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (name === 'consent') {
            setFormData(prev => ({ ...prev, consent: checked }));
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    const result = reader.result;
                    const base64 = result.split(',')[1];
                    resolve(base64);
                } else {
                    reject(new Error("Failed to convert file to base64"));
                }
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, fieldName: keyof FormFiles) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Basic validation (e.g. 5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB limit.");
                return;
            }

            try {
                const base64 = await convertToBase64(file);
                setFiles(prev => ({
                    ...prev,
                    [fieldName]: {
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        base64: base64
                    }
                }));
            } catch (error) {
                console.error("Error processing file", error);
                alert("Error processing file. Please try again.");
            }
        }
    };

    const removeFile = (fieldName: keyof FormFiles) => {
        setFiles(prev => ({ ...prev, [fieldName]: null }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        // Field Validation
        if (!formData.firstName || !formData.lastName || !formData.dateOfBirth ||
            !formData.passportNumber || !formData.passportExpiry || !formData.qualification ||
            !formData.experience || formData.subjects.length === 0 || !formData.consent) {
            setStatus('error');
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        if (!files.cv || !files.passportCopy) {
            setStatus('error');
            setErrorMessage('Please upload both your CV and Passport Copy.');
            return;
        }

        const payload = {
            ...formData,
            subjects: formData.subjects.join(', '), // Convert array to string for sheet
            files: files
        };

        const endpoint = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

        if (!endpoint) {
            setStatus('error');
            setErrorMessage('Configuration Error: Submission endpoint is missing (VITE_GOOGLE_APPS_SCRIPT_URL).');
            return;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.result === 'success' || result.status === 'success' || response.ok) {
                setStatus('success');
                setFormData(INITIAL_DATA);
                setFiles({ cv: null, passportCopy: null, medical: null, additional: null });
            } else {
                throw new Error('Submission failed');
            }

        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage('There was an issue submitting your application. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-gray-100 p-12 text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-navy mb-4">Application Submitted</h3>
                <p className="text-charcoal/80 mb-8 max-w-lg mx-auto leading-relaxed">
                    Thank you for applying with HDR Events. Our team will review your qualifications and contact you soon regarding the next steps.
                </p>
                <Button onClick={() => setStatus('idle')} variant="primary" className="!w-full md:!w-auto">
                    Submit Another Application
                </Button>
            </div>
        );
    }

    // --- REUSABLE UI COMPONENTS FOR FORM ---

    const FormSectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div className="mb-6">
            <h4 className="font-serif text-xl font-semibold text-navy mb-2">{children}</h4>
            <div className="h-0.5 w-12 bg-gold/60 rounded-full"></div>
        </div>
    );

    const InputLabel: React.FC<{ children: React.ReactNode, required?: boolean }> = ({ children, required }) => (
        <label className="block text-sm font-semibold text-navy mb-2">
            {children} {required && <span className="text-gold">*</span>}
        </label>
    );

    const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:border-gold focus:ring-[1.5px] focus:ring-gold outline-none transition-all duration-200 placeholder-gray-400";

    // Custom File Upload Component
    const FileUploadCard: React.FC<{
        label: string;
        file: FileData | null;
        fieldName: keyof FormFiles;
        required?: boolean;
        acceptText: string;
    }> = ({ label, file, fieldName, required, acceptText }) => (
        <div className="space-y-2">
            <InputLabel required={required}>{label}</InputLabel>

            {!file ? (
                <div className="group relative border-2 border-dashed border-navy/10 bg-[#F2F4F7] hover:bg-white hover:border-navy/30 rounded-xl p-8 text-center transition-all duration-300 cursor-pointer">
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={(e) => handleFileChange(e, fieldName)}
                    />
                    <div className="flex flex-col items-center space-y-3 group-hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-navy/60 group-hover:text-gold transition-colors">
                            <Upload strokeWidth={1.5} size={20} />
                        </div>
                        <div>
                            <p className="text-navy font-medium text-sm">Click to upload document</p>
                            <p className="text-xs text-charcoal/50 mt-1">{acceptText}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-between animate-fade-in">
                    <div className="flex items-center space-x-4 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                            <FileText size={20} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-navy truncate">{file.name}</p>
                            <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => removeFile(fieldName)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden font-sans">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-navy to-[#113754] px-8 py-6 md:px-12 border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <h3 className="text-white text-2xl font-serif font-bold relative z-10">Application Form</h3>
                <p className="text-white/80 text-sm mt-1 font-light tracking-wide relative z-10">Please complete all fields below to be considered.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">

                {/* Personal Details Section */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                    <FormSectionHeading>Personal Details</FormSectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <InputLabel required>First Name</InputLabel>
                            <input type="text" name="firstName" required className={inputClasses} value={formData.firstName} onChange={handleInputChange} />
                        </div>
                        <div>
                            <InputLabel>Middle Name</InputLabel>
                            <input type="text" name="middleName" className={inputClasses} value={formData.middleName} onChange={handleInputChange} />
                        </div>
                        <div>
                            <InputLabel required>Last Name</InputLabel>
                            <input type="text" name="lastName" required className={inputClasses} value={formData.lastName} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <InputLabel required>Date of Birth</InputLabel>
                            <div className="relative">
                                <input type="date" name="dateOfBirth" required className={`${inputClasses} pl-10`} value={formData.dateOfBirth} onChange={handleInputChange} />
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40 w-5 h-5" />
                            </div>
                        </div>
                        {/* Spacer or additional field could go here */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <InputLabel required>Passport Number</InputLabel>
                            <input type="text" name="passportNumber" required className={inputClasses} value={formData.passportNumber} onChange={handleInputChange} />
                        </div>
                        <div>
                            <InputLabel required>Passport Expiry Date</InputLabel>
                            <div className="relative">
                                <input type="date" name="passportExpiry" required className={`${inputClasses} pl-10`} value={formData.passportExpiry} onChange={handleInputChange} />
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40 w-5 h-5 p-px" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* divider */}
                <hr className="border-gray-100" />

                {/* Qualifications Section */}
                <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <FormSectionHeading>Professional Qualifications</FormSectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel required>Highest Qualification</InputLabel>
                            <select name="qualification" required className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230A2A43%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat`} value={formData.qualification} onChange={handleInputChange}>
                                <option value="">Select Qualification...</option>
                                <option value="Bachelors">Bachelor's Degree</option>
                                <option value="Masters">Master's Degree</option>
                                <option value="PhD">PhD / Doctorate</option>
                                <option value="PGCE">PGCE / Teaching License</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <InputLabel required>Years of Experience</InputLabel>
                            <input type="number" name="experience" min="0" required className={inputClasses} value={formData.experience} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mt-6">
                        <InputLabel>Certifications</InputLabel>
                        <input type="text" name="certifications" placeholder="e.g. CELTA, TEFL, IB Training" className={inputClasses} value={formData.certifications} onChange={handleInputChange} />
                    </div>

                    <div className="mt-8">
                        <InputLabel required>Subjects Interested in Teaching</InputLabel>
                        <p className="text-xs text-charcoal/50 mb-4">Select all that apply</p>
                        <div className="flex flex-wrap gap-2">
                            {SUBJECT_OPTIONS.map(subject => {
                                const isSelected = formData.subjects.includes(subject);
                                return (
                                    <button
                                        type="button"
                                        key={subject}
                                        onClick={() => handleSubjectToggle(subject)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${isSelected
                                                ? 'bg-navy text-white border-navy shadow-md shadow-navy/20'
                                                : 'bg-white text-navy border-gray-200 hover:border-gold hover:text-gold'
                                            }`}
                                    >
                                        {subject}
                                    </button>
                                );
                            })}
                        </div>
                        {/* Hidden input for validation if needed, though we validate state manualy */}
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Documents Section */}
                <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <FormSectionHeading>Documents</FormSectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FileUploadCard
                            label="CV / Resume"
                            fieldName="cv"
                            file={files.cv}
                            required
                            acceptText="PDF, DOC, JPG (Max 5MB)"
                        />
                        <FileUploadCard
                            label="Passport Copy"
                            fieldName="passportCopy"
                            file={files.passportCopy}
                            required
                            acceptText="PDF, JPG, PNG (Max 5MB)"
                        />
                        <FileUploadCard
                            label="Medical Certificate"
                            fieldName="medical"
                            file={files.medical}
                            acceptText="PDF, JPG, PNG (Optional)"
                        />
                        <FileUploadCard
                            label="Additional Documents"
                            fieldName="additional"
                            file={files.additional}
                            acceptText="Certificates, Reference Letters (Optional)"
                        />
                    </div>
                </div>

                {/* Additional Notes */}
                <div className="animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                    <InputLabel>Additional Notes</InputLabel>
                    <textarea
                        name="additionalNotes"
                        rows={4}
                        className={inputClasses}
                        placeholder="Any specific preferences or additional information..."
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                {/* Consent & Submit */}
                <div className="pt-6 border-t border-gray-100 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <label className="flex items-start space-x-4 cursor-pointer mb-8 group">
                        <div className="relative flex items-center mt-1">
                            <input
                                type="checkbox"
                                name="consent"
                                required
                                checked={formData.consent}
                                onChange={handleCheckboxChange}
                                className="peer h-6 w-6 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm transition-all text-navy checked:border-navy checked:bg-navy hover:border-gold focus:ring-2 focus:ring-gold/20"
                            />
                            <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-charcoal/70 leading-relaxed pt-1 group-hover:text-navy transition-colors">
                            I confirm that the information provided is accurate and authorize HDR Events to process my personal data for recruitment purposes.
                        </span>
                    </label>

                    {errorMessage && (
                        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg flex items-center gap-3 animate-shake">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-medium">{errorMessage}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-navy text-white font-semibold py-4 rounded-lg shadow-lg shadow-navy/20 hover:bg-[#113754] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Submitting Application...</span>
                            </>
                        ) : (
                            <span>Submit Application</span>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ApplicationForm;
