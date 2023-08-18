import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import {
  addSnippet,
  getSnippets,
  updateSnippetById,
  deleteSnippetById,
} from '../../Service/database';
import styles from './Home.module.scss';

// Interfaces
import CodeSnippetType from '../../Interfaces/codeSnippet';

// Components
import Snippet from '../Snippet';
import SearchBar from '../SearchBar';
import Modal from '../Modal';
import EditForm from '../EditForm';
import AddForm from '../AddForm';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [valueChangedFlag, setValueChangedFlag] = useState(false);

  const [snippets, setSnippets] = useState<Array<CodeSnippetType>>([]);
  const [filteredList, setFilteredList] = useState<Array<CodeSnippetType>>([]);

  const [editId, setEditId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const getInitialData = useCallback(async () => {
    const data = await getSnippets();
    setSnippets(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueChangedFlag]);

  const filter = useCallback(async () => {
    const filteredSnippets: Array<CodeSnippetType> = [];

    Object.values(snippets).forEach((value: CodeSnippetType) => {
      const { title, description } = value;
      if (
        title.toLowerCase().includes(searchText.toLowerCase()) ||
        description.toLowerCase().includes(searchText.toLowerCase())
      ) {
        filteredSnippets.push(value);
      }
    });

    setFilteredList(filteredSnippets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, snippets, valueChangedFlag]);

  const handleEdit = async (snippetId: string, data: CodeSnippetType) => {
    await updateSnippetById(snippetId, data);
    setValueChangedFlag(!valueChangedFlag);
    toast('Done!');
  };

  const handleAdd = async (data: CodeSnippetType) => {
    await addSnippet(data);
    toast('Done!');
    setValueChangedFlag(!valueChangedFlag);
  };

  const handleDelete = async (snippetId: string) => {
    // eslint-disable-next-line no-alert
    const resp = window.confirm('Are you sure you want to delete this snippet');
    if (resp) {
      await deleteSnippetById(snippetId);
      toast('Snippet deleted!');
      setValueChangedFlag(!valueChangedFlag);
    }
  };

  useEffect(() => {
    filter();
  }, [filter]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  return (
    <div className={styles.container}>
      <h1>🔒 CodeVault</h1>
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <AddForm onAdd={handleAdd} />
        </Modal>
      )}
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditForm snippetId={editId} onUpdate={handleEdit} />
        </Modal>
      )}
      <SearchBar onSearch={setSearchText} />
      <div className={styles.snippetContainer}>
        {filteredList.length ? (
          filteredList.map(({ id, title, description, language }) => {
            return (
              <Snippet
                key={id}
                id={id}
                title={title}
                description={description}
                language={language}
                onEdit={(snippetId: string) => {
                  setEditId(snippetId);
                  setShowEditModal(!showEditModal);
                }}
                onDelete={handleDelete}
              />
            );
          })
        ) : (
          <div
            className={styles.addNewSnippet}
            onClick={() => {
              setShowAddModal(true);
            }}
            role="button"
            onKeyDown={() => {
              setShowAddModal(true);
            }}
            tabIndex={0}
          >
            Add new snippet +
          </div>
        )}
      </div>
      <div
        className={styles.addButton}
        title="Add new snippet"
        onClick={() => {
          setShowAddModal(true);
        }}
        role="button"
        onKeyDown={() => {
          setShowAddModal(true);
        }}
        tabIndex={0}
      >
        +
      </div>
    </div>
  );
}
