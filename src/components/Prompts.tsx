import React, { FC } from 'react';

interface IPromptsProps {
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Prompts: FC<IPromptsProps> = ({ inputs, setInputs }) => {
  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleRemoveInput = (index: number) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const handleInputChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <div>
      <label
        className="input-label"
        htmlFor="prompts"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        Prompts
        <button
          type="button"
          onClick={handleAddInput}
          style={{
            marginBottom: '10px',
            cursor: 'pointer',
            padding: '5px 10px 5px 10px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '4px',
            border: 'none',
          }}
        >
          +
        </button>
      </label>
      <div>
        {inputs.map((input, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value, index)}
              style={{
                marginRight: '10px',
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
            <button
              type="button"
              onClick={() => handleRemoveInput(index)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px',
                cursor: 'pointer',
              }}
            >
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
