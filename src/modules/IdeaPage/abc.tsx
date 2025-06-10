// import React, { useState, useEffect } from 'react';

// // Form field configuration interface
// interface FormFieldConfig {
//   name: string;
//   label: string;
//   type: 'text' | 'email' | 'password' | 'number' | 'select' | 'radio' | 'checkbox' | 'textarea';
//   validation?: {
//     required?: boolean | string;
//     minLength?: number;
//     maxLength?: number;
//     pattern?: RegExp;
//     min?: number;
//     max?: number;
//   };
//   options?: Array<{ label: string; value: string | number }>;
//   placeholder?: string;
//   defaultValue?: any;
//   conditional?: (formData: any) => boolean;
//   className?: string;
// }

// interface FormConfig {
//   fields: FormFieldConfig[];
//   onSubmit: (data: any) => void;
//   submitButtonText?: string;
//   className?: string;
// }

// // Custom hook for dynamic form
// const useDynamicForm = (config: FormConfig) => {
//   const [formData, setFormData] = useState<any>({});
//   const [errors, setErrors] = useState<any>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Initialize form data with default values
//   useEffect(() => {
//     const initialData = config.fields.reduce((acc, field) => {
//       acc[field.name] = field.defaultValue || (field.type === 'checkbox' ? false : '');
//       return acc;
//     }, {} as any);
//     setFormData(initialData);
//   }, [config.fields]);

//   // Validation function
//   const validateField = (fieldConfig: FormFieldConfig, value: any) => {
//     const { validation } = fieldConfig;
//     if (!validation) return '';

//     if (validation.required && (!value || value === '')) {
//       return typeof validation.required === 'string' ? validation.required : `${fieldConfig.label} is required`;
//     }

//     if (validation.minLength && value.length < validation.minLength) {
//       return `${fieldConfig.label} must be at least ${validation.minLength} characters`;
//     }

//     if (validation.maxLength && value.length > validation.maxLength) {
//       return `${fieldConfig.label} must not exceed ${validation.maxLength} characters`;
//     }

//     if (validation.pattern && !validation.pattern.test(value)) {
//       return `${fieldConfig.label} format is invalid`;
//     }

//     if (validation.min && Number(value) < validation.min) {
//       return `${fieldConfig.label} must be at least ${validation.min}`;
//     }

//     if (validation.max && Number(value) > validation.max) {
//       return `${fieldConfig.label} must not exceed ${validation.max}`;
//     }

//     return '';
//   };

//   // Handle input change
//   const handleInputChange = (name: string, value: any) => {
//     setFormData(prev => ({ ...prev, [name]: value }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   // Validate all fields
//   const validateForm = () => {
//     const newErrors: any = {};
//     let isValid = true;

//     config.fields.forEach(field => {
//       // Skip validation for conditional fields that are not shown
//       if (field.conditional && !field.conditional(formData)) {
//         return;
//       }

//       const error = validateField(field, formData[field.name]);
//       if (error) {
//         newErrors[field.name] = error;
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (validateForm()) {
//       setIsSubmitting(true);
//       try {
//         await config.onSubmit(formData);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   // Reset form
//   const reset = () => {
//     const initialData = config.fields.reduce((acc, field) => {
//       acc[field.name] = field.defaultValue || (field.type === 'checkbox' ? false : '');
//       return acc;
//     }, {} as any);
//     setFormData(initialData);
//     setErrors({});
//   };

//   const renderField = (fieldConfig: FormFieldConfig) => {
//     const { name, label, type, options, placeholder, conditional, className } = fieldConfig;

//     // Check conditional rendering
//     if (conditional && !conditional(formData)) {
//       return null;
//     }

//     const value = formData[name] || '';
//     const error = errors[name];
//     const baseClasses = `w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${className || ''}`;
//     const errorClasses = error ? 'border-red-500' : '';

//     return (
//       <div key={name} className="mb-4">
//         <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//           {label}
//           {fieldConfig.validation?.required && <span className="text-red-500 ml-1">*</span>}
//         </label>

//         {(() => {
//           switch (type) {
//             case 'select':
//               return (
//                 <select
//                   id={name}
//                   value={value}
//                   onChange={(e) => handleInputChange(name, e.target.value)}
//                   className={`${baseClasses} ${errorClasses}`}
//                 >
//                   <option value="">Select an option</option>
//                   {options?.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               );

//             case 'radio':
//               return (
//                 <div className="space-y-2">
//                   {options?.map((option) => (
//                     <label key={option.value} className="flex items-center">
//                       <input
//                         type="radio"
//                         name={name}
//                         value={option.value}
//                         checked={value === option.value}
//                         onChange={(e) => handleInputChange(name, e.target.value)}
//                         className="mr-2 text-blue-600 focus:ring-blue-500"
//                       />
//                       <span className="text-sm text-gray-700">{option.label}</span>
//                     </label>
//                   ))}
//                 </div>
//               );

//             case 'checkbox':
//               return (
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={value}
//                     onChange={(e) => handleInputChange(name, e.target.checked)}
//                     className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
//                   />
//                   <span className="text-sm text-gray-700">{placeholder || label}</span>
//                 </label>
//               );

//             case 'textarea':
//               return (
//                 <textarea
//                   id={name}
//                   value={value}
//                   onChange={(e) => handleInputChange(name, e.target.value)}
//                   placeholder={placeholder}
//                   rows={4}
//                   className={`${baseClasses} ${errorClasses} resize-vertical`}
//                 />
//               );

//             default:
//               return (
//                 <input
//                   type={type}
//                   id={name}
//                   value={value}
//                   onChange={(e) => handleInputChange(name, e.target.value)}
//                   placeholder={placeholder}
//                   className={`${baseClasses} ${errorClasses}`}
//                 />
//               );
//           }
//         })()}

//         {error && (
//           <p className="mt-1 text-sm text-red-600">
//             {error}
//           </p>
//         )}
//       </div>
//     );
//   };

//   const renderForm = () => (
//     <div className={config.className}>
//       {config.fields.map(renderField)}
//       <button
//         onClick={handleSubmit}
//         disabled={isSubmitting}
//         className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isSubmitting ? 'Submitting...' : (config.submitButtonText || 'Submit')}
//       </button>
//     </div>
//   );

//   return {
//     formData,
//     errors,
//     isSubmitting,
//     renderForm,
//     renderField,
//     reset,
//     handleSubmit,
//     validateForm
//   };
// };

// // Form Builder Component - để test form
// const FormBuilder = () => {
//   const [formFields, setFormFields] = useState<FormFieldConfig[]>([]);
//   const [submittedData, setSubmittedData] = useState<any>(null);

//   // Thêm field mới
//   const addField = (type: FormFieldConfig['type']) => {
//     const newField: FormFieldConfig = {
//       name: `field_${Date.now()}`,
//       label: `New ${type} Field`,
//       type,
//       placeholder: `Enter ${type}...`,
//       validation: { required: true }
//     };

//     if (type === 'select' || type === 'radio') {
//       newField.options = [
//         { label: 'Option 1', value: 'option1' },
//         { label: 'Option 2', value: 'option2' }
//       ];
//     }

//     setFormFields(prev => [...prev, newField]);
//   };

//   // Xóa field
//   const removeField = (index: number) => {
//     setFormFields(prev => prev.filter((_, i) => i !== index));
//   };

//   // Update field config
//   const updateField = (index: number, updates: Partial<FormFieldConfig>) => {
//     setFormFields(prev => prev.map((field, i) =>
//       i === index ? { ...field, ...updates } : field
//     ));
//   };

//   const formConfig: FormConfig = {
//     fields: formFields,
//     onSubmit: (data) => {
//       console.log('Form submitted:', data);
//       setSubmittedData(data);
//     },
//     submitButtonText: 'Test Submit',
//     className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'
//   };

//   const { renderForm, reset } = useDynamicForm(formConfig);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//           Dynamic Form Builder & Tester
//         </h1>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Form Builder */}
//           <div className="lg:col-span-1">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Fields</h2>
//               <div className="grid grid-cols-2 gap-2 mb-4">
//                 {['text', 'email', 'password', 'number', 'select', 'radio', 'checkbox', 'textarea'].map(type => (
//                   <button
//                     key={type}
//                     onClick={() => addField(type as FormFieldConfig['type'])}
//                     className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                   >
//                     {type}
//                   </button>
//                 ))}
//               </div>

//               <div className="space-y-3">
//                 {formFields.map((field, index) => (
//                   <div key={field.name} className="p-3 border rounded bg-gray-50">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="font-medium text-sm">{field.type} - {field.label}</span>
//                       <button
//                         onClick={() => removeField(index)}
//                         className="text-red-500 hover:text-red-700 text-sm"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                     <input
//                       type="text"
//                       value={field.label}
//                       onChange={(e) => updateField(index, { label: e.target.value })}
//                       className="w-full px-2 py-1 text-sm border rounded"
//                       placeholder="Field label"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Generated Form */}
//           <div className="lg:col-span-1">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">Generated Form</h2>
//             {formFields.length > 0 ? (
//               renderForm()
//             ) : (
//               <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
//                 Add some fields to see the form
//               </div>
//             )}
//           </div>

//           {/* Results */}
//           <div className="lg:col-span-1">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">Form Data</h2>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               {submittedData ? (
//                 <div>
//                   <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
//                     {JSON.stringify(submittedData, null, 2)}
//                   </pre>
//                   <button
//                     onClick={() => {
//                       setSubmittedData(null);
//                       reset();
//                     }}
//                     className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
//                   >
//                     Clear Data
//                   </button>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 italic">No data submitted yet</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Current Form Config */}
//         <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-medium mb-4 text-gray-700">Current Form Config</h3>
//           <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
//             {JSON.stringify(formFields, null, 2)}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;


