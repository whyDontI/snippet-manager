import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import { retrieveValue, storeValue } from '../../Service/localStorage';
import { updateItemById, deleteItemById } from '../../Service/database';
import styles from './Home.module.scss';

// Interfaces
import DataBaseType from '../../Interfaces/database';
import CodeSnippetType from '../../Interfaces/codeSnippet';

// Components
import Snippet from '../Snippet';
import SearchBar from '../SearchBar';
import Modal from '../Modal';
import EditForm from '../EditForm';
import AddForm from '../AddForm';

const DATABASE_NAME = 'SnippetVault';

const INITIAL_DATA: DataBaseType = {};

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [valueChangedFlag, setValueChangedFlag] = useState(false);
  const [filteredList, setFilteredList] = useState(INITIAL_DATA);

  const [editId, setEditId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const filter = useCallback(() => {
    const snippets = retrieveValue(DATABASE_NAME) as DataBaseType;
    const filteredSnippets: DataBaseType = {};

    Object.entries(snippets).forEach(([id, value]) => {
      const { title, description } = value;
      if (
        title.toLowerCase().includes(searchText.toLowerCase()) ||
        description.toLowerCase().includes(searchText.toLowerCase())
      ) {
        filteredSnippets[id] = value;
      }
    });

    setFilteredList(filteredSnippets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, valueChangedFlag]);

  const handleAddOrEdit = (snippetId: string, data: CodeSnippetType) => {
    updateItemById(snippetId, data);
    setValueChangedFlag(!valueChangedFlag);
    toast('Done!');
  };

  const handleDelete = (snippetId: string) => {
    // eslint-disable-next-line no-alert
    const resp = window.confirm('Are you sure you want to delete this snippet');
    if (resp) {
      deleteItemById(snippetId);
      setValueChangedFlag(!valueChangedFlag);
      toast('Snippet deleted!');
    }
  };

  useEffect(() => {
    if (!retrieveValue(DATABASE_NAME)) {
      storeValue(DATABASE_NAME, INITIAL_DATA);
    }
  }, []);

  useEffect(() => {
    filter();
  }, [filter]);

  return (
    <div className={styles.container}>
      <h1>🔒 CodeVault</h1>
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <AddForm onAdd={handleAddOrEdit} />
        </Modal>
      )}
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditForm snippetId={editId} onUpdate={handleAddOrEdit} />
        </Modal>
      )}
      <SearchBar onSearch={setSearchText} />
      <div className={styles.snippetContainer}>
        {Object.keys(filteredList).length ? (
          Object.entries(filteredList).map(
            ([id, { title, description, language }]) => {
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
            }
          )
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
