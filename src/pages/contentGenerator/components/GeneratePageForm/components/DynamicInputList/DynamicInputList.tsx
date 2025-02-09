import { FC } from 'react';
import { useFieldArray, Control, UseFormRegister } from 'react-hook-form';
// import { InputField } from '../InputField';

// interface DynamicInputListProps {
//   name: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   control: Control<any>;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   register: UseFormRegister<any>;
//   sectionLabel: string;
//   promptLabel: string;
//   placeholder?: string;
// }

// export const DynamicInputList: FC<DynamicInputListProps> = ({
//   name,
//   control,
//   register,
//   sectionLabel,
//   promptLabel,
//   placeholder = 'Enter value',
// }) => {
//   const { fields, append, remove } = useFieldArray({ control, name });

//   return (
//     <div>
//       <label>{sectionLabel}:</label>
//       {fields.map((field, index) => (
//         <div key={field.id} style={{ display: 'flex', gap: '8px' }}>
//           <InputField
//             label={`${promptLabel} ${index + 1}`}
//             placeholder={placeholder}
//             {...register(`${name}.${index}.value`)}
//           />
//           <button type="button" onClick={() => remove(index)}>
//             Remove
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={() => append({ value: '' })}>
//         Add input
//       </button>
//     </div>
//   );
// };

interface DynamicInputListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
  title: string;
}

export const DynamicInputList: FC<DynamicInputListProps> = ({
  control,
  register,
  name,
  title,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      {title && <p>{title}</p>}
      {fields.map((field, index) => (
        <div key={index}>
          <input key={field.id} {...register(`${name}.${index}.value`)} />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ value: '' })}>
        Add input
      </button>
    </div>
  );
};
