import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required'),
  complaint: Yup.string().required('Complaint is required'),
});

function ComplaintLetter({ setComplaint }) {

    const handleOk = (values) => {
        console.log('Subject:', values.subject);
        console.log('Complaint:', values.complaint);
        const subject=values.subject;
        const content=values.complaint;
        const complaint={subject,content};
        setComplaint(complaint)
        // Here, you can perform any additional actions you want with the form values
      };

  return (
    
      <div className="bg-white rounded-lg p-6  w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4 text-gray-500">Add Complaint Letter</h2>
        <Formik
          initialValues={{
            subject: '',
            complaint: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleOk}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="subject">
                  Subject
                </label>
                <Field
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none bg-blue-200 focus:border-blue-500"
                />
                <ErrorMessage name="subject" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="complaint">
                  Complaint
                </label>
                <Field
                  as="textarea"
                  id="complaint"
                  name="complaint"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none text-black bg-blue-200 focus:border-blue-500"
                  rows={4}
                />
                <ErrorMessage name="complaint" component="div" className="text-red-500" />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded mr-2"
                >
                  Submit
                </button>
                
              </div>
            </Form>
          )}
        </Formik>
      </div>
   
  );
}

export default ComplaintLetter;

