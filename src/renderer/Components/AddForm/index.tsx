import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import AceEditor from 'react-ace';
import styles from '../EditForm/EditForm.module.scss'; // Import the SCSS module
import CodeSnippetType from '../../Interfaces/codeSnippet';

import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

interface AddCodeSnippetFormProps {
  onAdd: (id: string, data: CodeSnippetType) => void;
}

export default function AddCodeSnippetForm({ onAdd }: AddCodeSnippetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm<CodeSnippetType>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<CodeSnippetType> = (data: CodeSnippetType) => {
    if (!data.language) data.language = 'JS';
    onAdd(uuidv4(), data);
  };

  return (
    <form
      className={styles['form-container']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Add snippet</h1>
      <label htmlFor="title">
        <span className={styles.title}>Title:</span>
        <input
          id="title"
          className={errors.title && styles.error}
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && (
          <span className={styles.errorText}>{errors.title.message}</span>
        )}
      </label>
      <label htmlFor="description">
        <span className={styles.title}>Description:</span>
        <textarea
          id="description"
          className={errors.description && styles.error}
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && (
          <span className={styles.errorText}>{errors.description.message}</span>
        )}
      </label>
      <label htmlFor="code">
        <span className={styles.title}>Code:</span>
        <Controller
          control={control}
          name="code"
          rules={{
            required: 'Requried',
          }}
          render={({
            field: { onChange, value, ref },
            fieldState: { error },
          }) => (
            <AceEditor
              className={error && styles.error}
              style={{
                width: '100%',
                minHeight: '5rem',
                maxHeight: '15rem',
                resize: 'vertical',
                overflow: 'hidden',
                fontSize: 'none',
              }}
              ref={ref}
              mode="jsx"
              theme="monokai"
              onChange={onChange}
              name="code"
              editorProps={{}}
              value={value}
              setOptions={{
                tabSize: 2,
                showLineNumbers: false,
                showGutter: false,
                showPrintMargin: false,
              }}
            />
          )}
        />
        {errors.code && (
          <span className={styles.errorText}>{errors.code.message}</span>
        )}
      </label>
      <label htmlFor="language">
        <span className={styles.title}>Language:</span>
        <input id="language" {...register('language', { required: false })} />
      </label>
      <button type="submit" disabled={!isDirty || !isValid}>
        Add
      </button>
    </form>
  );
}
