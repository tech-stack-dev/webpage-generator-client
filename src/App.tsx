import { useState } from 'react';
import './App.css';
import { Prompts } from './components/Prompts';
import { GeneratedData } from './components/GeneratedData';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [inputs, setInputs] = useState(['']);
  const [generatedData, setGenerationData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formDataObject = Object.fromEntries(formData.entries());

    formDataObject.prompts = inputs;

    const toastId = toast.loading('Generating...');
    try {
      setIsLoading(true);

      const res = await fetch('http://localhost:3000/generated-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      const responseData = await res.json();
      setGenerationData(responseData.generatedPage);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred! Try again', {
        duration: 3000,
      });
    }
    setIsLoading(false);
    toast.remove(toastId);
  };

  return (
    <>
      <Toaster />
      <form className="form" onSubmit={handleSubmit}>
        <label className="input-label" htmlFor="serviceType">
          Service Type
        </label>
        <input
          className="form-input"
          id="serviceType"
          name="serviceType"
          defaultValue="Artificial Intelligence Development Services"
        />

        <label className="input-label" htmlFor="basePage">
          Base Page
        </label>
        <textarea
          className="form-input"
          id="basePage"
          name="basePage"
          defaultValue="https://tech-stack.com/services/artificial-intelligence"
        />

        <label className="input-label" htmlFor="structurePage">
          Structure Page
        </label>
        <textarea
          className="form-input"
          id="structurePage"
          name="structurePage"
          defaultValue="Service-oriented"
        />

        <label className="input-label" htmlFor="minTextSize">
          Min Text Size
        </label>
        <input
          className="form-input"
          id="minTextSize"
          name="minTextSize"
          type="number"
          defaultValue="500"
        />

        <label className="input-label" htmlFor="keywords">
          Keywords
        </label>
        <input
          className="form-input"
          id="keywords"
          name="keywords"
          defaultValue="AI development, machine learning, deep learning, Warsaw"
        />

        <label className="input-label" htmlFor="metaTitle">
          Meta Title
        </label>
        <input
          className="form-input"
          id="metaTitle"
          name="metaTitle"
          defaultValue="Artificial Intelligence Development Services in Warsaw"
        />

        <label className="input-label" htmlFor="metaDescription">
          Meta Description
        </label>
        <textarea
          className="form-input"
          id="metaDescription"
          name="metaDescription"
          defaultValue="Elevate your Warsaw-based business with our AI development services, including machine learning, deep learning, and predictive analytics."
        />

        <label className="input-label" htmlFor="geo">
          Geo
        </label>
        <input
          className="form-input"
          id="geo"
          name="geo"
          defaultValue="Warsaw"
        />

        <label className="input-label" htmlFor="slug">
          Slug
        </label>
        <input
          className="form-input"
          id="slug"
          name="slug"
          defaultValue="artificial-intelligence-development-warsaw"
        />

        <Prompts inputs={inputs} setInputs={setInputs} />

        <button
          className="submit-button"
          type="submit"
          disabled={isLoading}
          style={{
            opacity: isLoading ? '0.5' : '1',
          }}
        >
          Submit
        </button>
      </form>
      <GeneratedData data={generatedData} />
    </>
  );
};
