import styles from './Snippet.module.scss';

interface SnippetProps {
  id: string;
  title: string;
  description: string;
  language: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function Snippet({
  id,
  title,
  description,
  language,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEdit = (snippetId: string) => null,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDelete = (snippetId: string) => null,
}: SnippetProps) {
  return (
    <div className={styles.snippet} key={id}>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          <span>{language}</span>
          {title}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.actions}>
        <button onClick={() => onEdit(id)} type="button">
          Edit
        </button>
        <button onClick={() => onDelete(id)} type="button">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Snippet;
