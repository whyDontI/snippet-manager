import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import AceEditor from 'react-ace';

import styles from './EditForm.module.scss'; // Import the SCSS module
import CodeSnippetType from '../../Interfaces/codeSnippet';
import { getItemById } from '../../Service/database';

import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

interface CodeSnippetFormProps {
  snippetId: string;
  onUpdate: (id: string, data: CodeSnippetType) => void;
}

export default function CodeSnippetForm({
  snippetId = '',
  onUpdate,
}: CodeSnippetFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm<CodeSnippetType>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<CodeSnippetType> = (data: CodeSnippetType) => {
    if (!data.language) data.language = 'JS';
    onUpdate(snippetId, data);
  };

  useEffect(() => {
    // Get data
    const dataToEdit = getItemById(snippetId);
    reset(dataToEdit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snippetId]);

  return (
    <form
      className={styles['form-container']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Edit snippet</h1>
      <label htmlFor="title">
        <span className={styles.title}>Title:</span>
        <input
          id="title"
          className={errors.title && styles.error}
          {...register('title', { required: 'Please add a title' })}
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
          {...register('description', {
            required: 'Please write apt description',
          })}
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
            required: true,
          }}
          render={({ field: { onChange, value, ref } }) => (
            <AceEditor
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
        Update
      </button>
    </form>
  );
}
